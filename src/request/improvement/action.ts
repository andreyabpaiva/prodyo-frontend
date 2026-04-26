import { Improvements } from "@/apis/Improvements";
import { API_BASE_URL } from "@/request/api-client";
import type { CreateImprovementPayload } from "./types";

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

export const improvementAction = {
  create: async (payload: CreateImprovementPayload) => {
    const response = await improvementsApi.improvementsCreate(payload);
    return response.data;
  },
};
