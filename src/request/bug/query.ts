import { Bugs } from "@/apis/Bugs";
import { apiFetch, API_BASE_URL } from "@/request/api-client";
import type { BugsListParams } from "@/apis/data-contracts";
import type { Bug } from "@/types/domain";

const bugsApi = new Bugs({
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

export const bugQuery = {
  list: async (params: BugsListParams) => {
    const response = await bugsApi.bugsList(params);
    return response.data;
  },

  getById: (bugId: string) => apiFetch<Bug>(`/bugs/${bugId}`),
};
