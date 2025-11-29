import { Improvement } from "@/types/domain";
import { apiFetch } from "./api-client";

const IMPROVEMENTS_PATH = "/improvements";

export type UpsertImprovementPayload = {
  taskId: string;
  number: number;
  description: string;
  assigneeId: string;
  loggedAt?: string;
};

export const improvementService = {
  list: (params?: { taskId?: string }) =>
    apiFetch<Improvement[]>(IMPROVEMENTS_PATH, { params }),

  getById: (improvId: string) =>
    apiFetch<Improvement>(`${IMPROVEMENTS_PATH}/${improvId}`),

  create: (payload: UpsertImprovementPayload) =>
    apiFetch<Improvement>(IMPROVEMENTS_PATH, {
      method: "POST",
      body: payload,
    }),

  update: (improvId: string, payload: Partial<UpsertImprovementPayload>) =>
    apiFetch<Improvement>(`${IMPROVEMENTS_PATH}/${improvId}`, {
      method: "PUT",
      body: payload,
    }),

  delete: (improvId: string) =>
    apiFetch<void>(`${IMPROVEMENTS_PATH}/${improvId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),
};

