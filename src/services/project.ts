import { Project } from "@/types/domain";
import { apiFetch } from "./api-client";
import type {
  HandlersCreateProjectRequest,
  HandlersUpdateProjectRequest,
} from "@/apis/data-contracts";

const PROJECTS_PATH = "/projects";

export type CreateProjectPayload = HandlersCreateProjectRequest;
export type UpdateProjectPayload = HandlersUpdateProjectRequest;

export const projectService = {
  list: (params?: { page?: number; page_size?: number }) =>
    apiFetch<Record<string, any>>(PROJECTS_PATH, { params }),

  getById: (projectId: string) =>
    apiFetch<Project>(`${PROJECTS_PATH}/${projectId}`),

  create: (payload: CreateProjectPayload) =>
    apiFetch<Record<string, any>>(PROJECTS_PATH, {
      method: "POST",
      body: payload,
    }),

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