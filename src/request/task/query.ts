import { Tasks } from "@/apis/Tasks";
import { apiFetch, API_BASE_URL } from "@/request/api-client";
import type { TasksListParams } from "@/apis/data-contracts";
import type { Task } from "@/types/domain";

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

export const taskQuery = {
  list: async (params: TasksListParams) => {
    const response = await tasksApi.tasksList(params);
    return response.data;
  },

  getById: (taskId: string) => apiFetch<Task>(`/tasks/${taskId}`),
};
