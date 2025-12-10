import { Task } from "@/types/domain";
import { apiFetch } from "./api-client";
import type {
  HandlersCreateTaskRequest,
  HandlersUpdateTaskRequest,
} from "@/apis/data-contracts";

const TASKS_PATH = "/tasks";

export type CreateTaskPayload = HandlersCreateTaskRequest;
export type UpdateTaskPayload = HandlersUpdateTaskRequest;

export const taskService = {
  list: (params: { iteration_id: string }) =>
    apiFetch<Task[]>(TASKS_PATH, { params }),

  getById: (taskId: string) => apiFetch<Task>(`${TASKS_PATH}/${taskId}`),

  create: (payload: CreateTaskPayload) =>
    apiFetch<Record<string, any>>(TASKS_PATH, {
      method: "POST",
      body: payload,
    }),

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

