import { Iterations } from "@/apis/Iterations";
import { apiFetch, API_BASE_URL } from "@/request/api-client";
import type {
  CausesActionsListParams,
  IterationsListParams,
} from "@/apis/data-contracts";
import type { Iteration } from "@/types/domain";

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

export const iterationQuery = {
  list: async (params: IterationsListParams) => {
    const response = await iterationsApi.iterationsList(params);
    return response.data;
  },

  getById: (iterationId: string) =>
    apiFetch<Iteration>(`/iterations/${iterationId}`),

  analysis: async (iterationId: string) => {
    const response = await iterationsApi.analysisList({ id: iterationId });
    return response.data;
  },

  causeActionList: async (params: CausesActionsListParams) => {
    const response = await iterationsApi.causesActionsList({
      iterationId: params.iterationId,
    });
    return response.data;
  },
};
