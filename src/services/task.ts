import {
  Bug,
  Improvement,
  Task,
  TaskStatus,
  User,
} from "@/types/domain";
import { apiFetch } from "./api-client";

const TASKS_PATH = "/tasks";

export type UpsertTaskPayload = {
  iterationId: string;
  name: string;
  description: string;
  status: TaskStatus;
  points: number;
  assigneeId: string;
  totalTime?: string;
};

export const taskService = {
  list: (params?: { iterationId?: string }) =>
    apiFetch<Task[]>(TASKS_PATH, { params }),

  getById: (taskId: string) => apiFetch<Task>(`${TASKS_PATH}/${taskId}`),

  create: (payload: UpsertTaskPayload) =>
    apiFetch<Task>(TASKS_PATH, { method: "POST", body: payload }),

  update: (taskId: string, payload: Partial<UpsertTaskPayload>) =>
    apiFetch<Task>(`${TASKS_PATH}/${taskId}`, {
      method: "PUT",
      body: payload,
    }),

  delete: (taskId: string) =>
    apiFetch<void>(`${TASKS_PATH}/${taskId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),

  getImprovements: (taskId: string) =>
    apiFetch<Improvement[]>(`${TASKS_PATH}/${taskId}/improvements`),

  getBugs: (taskId: string) =>
    apiFetch<Bug[]>(`${TASKS_PATH}/${taskId}/bugs`),

  reassign: (taskId: string, assignee: User) =>
    apiFetch<Task>(`${TASKS_PATH}/${taskId}/assignee`, {
      method: "PUT",
      body: { assigneeId: assignee.id },
    }),
};

