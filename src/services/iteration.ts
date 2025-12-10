import { Iteration } from "@/types/domain";
import { apiFetch } from "./api-client";
import type { HandlersCreateIterationRequest } from "@/apis/data-contracts";

const ITERATIONS_PATH = "/iterations";

export type CreateIterationPayload = HandlersCreateIterationRequest;

export const iterationService = {
  list: (params: { project_id: string }) =>
    apiFetch<Iteration[]>(ITERATIONS_PATH, { params }),

  getById: (iterationId: string) =>
    apiFetch<Iteration>(`${ITERATIONS_PATH}/${iterationId}`),

  create: (payload: CreateIterationPayload) =>
    apiFetch<Record<string, any>>(ITERATIONS_PATH, {
      method: "POST",
      body: payload,
    }),

  delete: (iterationId: string) =>
    apiFetch<void>(`${ITERATIONS_PATH}/${iterationId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),
};

