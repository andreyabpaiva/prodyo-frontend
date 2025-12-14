import { Task } from "@/types/domain";
import { apiFetch } from "./api-client";
import { Tasks } from "@/apis/Tasks";
import type {
  HandlersCreateTaskRequest,
  HandlersUpdateTaskRequest,
  TasksListParams,
} from "@/apis/data-contracts";

const TASKS_PATH = "/tasks";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081/api/v1";

const tasksApi = new Tasks({
  baseUrl: API_BASE_URL,
  securityWorker: () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return {};
  },
});

export type CreateTaskPayload = HandlersCreateTaskRequest;
export type UpdateTaskPayload = HandlersUpdateTaskRequest;

export const taskService = {
  list: async (params: TasksListParams) => {
    const response = await tasksApi.tasksList(params);
    return response.data;
  },

  getById: (taskId: string) => apiFetch<Task>(`${TASKS_PATH}/${taskId}`),

  create: async (payload: CreateTaskPayload) => {
    const response = await tasksApi.tasksCreate(payload);
    return response.data;
  },

  update: (taskId: string, payload: UpdateTaskPayload) =>
    apiFetch<Task>(`${TASKS_PATH}/${taskId}`, {
      method: "PUT",
      body: payload,
    }),

  delete: (taskId: string) =>
    apiFetch<void>(`${TASKS_PATH}/${taskId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),
};

