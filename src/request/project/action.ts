import { Projects } from "@/apis/Projects";
import { apiFetch, API_BASE_URL } from "@/request/api-client";
import type { Project } from "@/types/domain";
import type { CreateProjectPayload, UpdateProjectPayload } from "./types";

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

export const projectAction = {
  create: async (payload: CreateProjectPayload) => {
    const response = await projectsApi.projectsCreate(payload);
    return response.data;
  },

  update: (projectId: string, payload: UpdateProjectPayload) =>
    apiFetch<Project>(`/projects/${projectId}`, {
      method: "PUT",
      body: payload,
    }),

  delete: (projectId: string) =>
    apiFetch<void>(`/projects/${projectId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),
};
