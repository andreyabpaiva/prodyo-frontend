import { Indicator, Iteration, Task } from "@/types/domain";
import { apiFetch } from "./api-client";

const ITERATIONS_PATH = "/iterations";

export type UpsertIterationPayload = {
  projectId: string;
  number: number;
  description?: string;
  startAt: string;
  endAt: string;
};

export const iterationService = {
  list: (params?: { projectId?: string }) =>
    apiFetch<Iteration[]>(ITERATIONS_PATH, { params }),

  getById: (iterationId: string) =>
    apiFetch<Iteration>(`${ITERATIONS_PATH}/${iterationId}`),

  create: (payload: UpsertIterationPayload) =>
    apiFetch<Iteration>(ITERATIONS_PATH, {
      method: "POST",
      body: payload,
    }),

  update: (iterationId: string, payload: Partial<UpsertIterationPayload>) =>
    apiFetch<Iteration>(`${ITERATIONS_PATH}/${iterationId}`, {
      method: "PUT",
      body: payload,
    }),

  delete: (iterationId: string) =>
    apiFetch<void>(`${ITERATIONS_PATH}/${iterationId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),

  getTasks: (iterationId: string) =>
    apiFetch<Task[]>(`${ITERATIONS_PATH}/${iterationId}/tasks`),

  getIndicators: (iterationId: string) =>
    apiFetch<Indicator[]>(`${ITERATIONS_PATH}/${iterationId}/indicators`),
};

