import { Iteration } from "@/types/domain";
import { apiFetch } from "./api-client";
import { Iterations } from "@/apis/Iterations";
import type { HandlersCreateIterationRequest, IterationsListParams } from "@/apis/data-contracts";

const ITERATIONS_PATH = "/iterations";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081/api/v1";

const iterationsApi = new Iterations({
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

export type CreateIterationPayload = HandlersCreateIterationRequest;

export const iterationService = {
  list: async (params: IterationsListParams) => {
    const response = await iterationsApi.iterationsList(params);
    return response.data;
  },

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

