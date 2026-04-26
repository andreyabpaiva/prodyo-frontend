import { Tasks } from "@/apis/Tasks";
import { apiFetch, API_BASE_URL } from "@/request/api-client";
import type { CreateTaskPayload, PatchTaskPayload, UpdateTaskPayload } from "./types";

const tasksApi = new Tasks({
  baseUrl: API_BASE_URL,
  securityWorker: () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      return { headers: { Authorization: `Bearer ${token}` } };
    }
    return {};
  },
});

export const taskAction = {
  create: async (payload: CreateTaskPayload) => {
    const response = await tasksApi.tasksCreate(payload);
    return response.data;
  },

  update: async (taskId: string, payload: UpdateTaskPayload) => {
    const response = await tasksApi.tasksUpdate({ id: taskId }, payload);
    return response.data;
  },

  delete: (taskId: string) =>
    apiFetch<void>(`/tasks/${taskId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),

  patch: async (taskId: string, payload: PatchTaskPayload) => {
    const response = await tasksApi.tasksPartialUpdate({ id: taskId }, payload);
    return response.data;
  },
};
