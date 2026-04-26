import { Projects } from "@/apis/Projects";
import { apiFetch, API_BASE_URL } from "@/request/api-client";
import type {
  IndicatorRangesDetailParams,
  IndicatorRangesListParams,
  MemberDetailParams,
  ProjectsDetailParams,
} from "@/apis/data-contracts";
import type { Project } from "@/types/domain";

const projectsApi = new Projects({
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

export const projectQuery = {
  list: (params?: { page?: number; page_size?: number }) =>
    apiFetch<Record<string, unknown>>("/projects", { params }),

  getById: (projectId: string) =>
    apiFetch<Project>(`/projects/${projectId}`),

  getDetail: async (params: ProjectsDetailParams) => {
    const response = await projectsApi.projectsDetail(params);
    return response.data;
  },

  listIndicatorRanges: async (params: IndicatorRangesListParams) => {
    const response = await projectsApi.indicatorRangesList(params);
    return response.data;
  },

  memberDetail: async (params: MemberDetailParams) => {
    const response = await projectsApi.memberDetail(params);
    return response.data;
  },

  getIndicatorsIdByProjectId: async (params: IndicatorRangesDetailParams) => {
    const response = await projectsApi.indicatorRangesDetail(params);
    return response.data;
  },
};
