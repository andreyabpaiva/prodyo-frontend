import { Improvements } from "@/apis/Improvements";
import { apiFetch, API_BASE_URL } from "@/request/api-client";
import type { ImprovementsListParams } from "@/apis/data-contracts";
import type { Improvement } from "@/types/domain";

const improvementsApi = new Improvements({
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

export const improvementQuery = {
  list: async (params: ImprovementsListParams) => {
    const response = await improvementsApi.improvementsList(params);
    return response.data;
  },

  getById: (improvId: string) =>
    apiFetch<Improvement>(`/improvements/${improvId}`),
};
