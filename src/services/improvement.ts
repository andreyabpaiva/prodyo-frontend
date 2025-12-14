import { Improvement } from "@/types/domain";
import { apiFetch } from "./api-client";
import { Improvements } from "@/apis/Improvements";
import type {
  HandlersCreateImprovRequest,
  ImprovementsListParams,
} from "@/apis/data-contracts";

const IMPROVEMENTS_PATH = "/improvements";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081/api/v1";

const improvementsApi = new Improvements({
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

export type CreateImprovementPayload = HandlersCreateImprovRequest;

export const improvementService = {
  list: async (params: ImprovementsListParams) => {
    const response = await improvementsApi.improvementsList(params);
    return response.data;
  },

  getById: (improvId: string) =>
    apiFetch<Improvement>(`${IMPROVEMENTS_PATH}/${improvId}`),

  create: async (payload: CreateImprovementPayload) => {
    const response = await improvementsApi.improvementsCreate(payload);
    return response.data;
  }
};

