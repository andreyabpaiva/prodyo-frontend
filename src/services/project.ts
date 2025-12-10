import { Project } from "@/types/domain";
import { apiFetch } from "./api-client";
import { Projects } from "@/apis/Projects";
import type {
  HandlersCreateProjectRequest,
  HandlersUpdateProjectRequest,
} from "@/apis/data-contracts";

const PROJECTS_PATH = "/projects";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081/api/v1";

const projectsApi = new Projects({
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

export type CreateProjectPayload = HandlersCreateProjectRequest;
export type UpdateProjectPayload = HandlersUpdateProjectRequest;

export const projectService = {
  list: (params?: { page?: number; page_size?: number }) =>
    apiFetch<Record<string, any>>(PROJECTS_PATH, { params }),

  getById: (projectId: string) =>
    apiFetch<Project>(`${PROJECTS_PATH}/${projectId}`),

  create: async (payload: CreateProjectPayload) => {
    const response = await projectsApi.projectsCreate(payload);
    return response.data;
  },

  update: (projectId: string, payload: UpdateProjectPayload) =>
    apiFetch<Project>(`${PROJECTS_PATH}/${projectId}`, {
      method: "PUT",
      body: payload,
    }),

  delete: (projectId: string) =>
    apiFetch<void>(`${PROJECTS_PATH}/${projectId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),
};