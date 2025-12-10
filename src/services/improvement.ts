import { Improvement } from "@/types/domain";
import { apiFetch } from "./api-client";
import type { HandlersCreateImprovRequest } from "@/apis/data-contracts";

const IMPROVEMENTS_PATH = "/improvements";

export type CreateImprovementPayload = HandlersCreateImprovRequest;

export const improvementService = {
  list: (params: { task_id: string }) =>
    apiFetch<Improvement[]>(IMPROVEMENTS_PATH, { params }),

  getById: (improvId: string) =>
    apiFetch<Improvement>(`${IMPROVEMENTS_PATH}/${improvId}`),

  create: (payload: CreateImprovementPayload) =>
    apiFetch<Record<string, any>>(IMPROVEMENTS_PATH, {
      method: "POST",
      body: payload,
    }),
};

