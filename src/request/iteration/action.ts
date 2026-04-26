import { Iterations } from "@/apis/Iterations";
import { API_BASE_URL } from "@/request/api-client";
import type { IterationsDeleteParams } from "@/apis/data-contracts";
import type { CreateIterationPayload } from "./types";

const iterationsApi = new Iterations({
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

export const iterationAction = {
  create: async (payload: CreateIterationPayload) => {
    const response = await iterationsApi.iterationsCreate(payload);
    return response.data;
  },

  delete: async (params: IterationsDeleteParams) => {
    const response = await iterationsApi.iterationsDelete(params);
    return response.data;
  },
};
