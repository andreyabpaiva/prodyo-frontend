import { Iteration, Member, Project } from "@/types/domain";
import { apiFetch } from "./api-client";

const PROJECTS_PATH = "/projects";

export type CreateProjectPayload = {
  name: string;
  description: string;
  members: string[];
  colorSelect?: string;
  prodRange: { ok: string; alert: string; critical: string };
};

export const projectService = {
  list: (params?: { userId?: string }) =>
    apiFetch<Project[]>(PROJECTS_PATH, { params }),

  getById: (projectId: string) =>
    apiFetch<Project>(`${PROJECTS_PATH}/${projectId}`),

  create: (payload: CreateProjectPayload) =>
    apiFetch<Project>(PROJECTS_PATH, {
      method: "POST",
      body: payload,
    }),

  update: (projectId: string, payload: Partial<Project>) =>
    apiFetch<Project>(`${PROJECTS_PATH}/${projectId}`, {
      method: "PUT",
      body: payload,
    }),

  delete: (projectId: string) =>
    apiFetch<void>(`${PROJECTS_PATH}/${projectId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),

  getIterations: (projectId: string) =>
    apiFetch<Iteration[]>(`${PROJECTS_PATH}/${projectId}/iterations`),

  getMembers: (projectId: string) =>
    apiFetch<Member[]>(`${PROJECTS_PATH}/${projectId}/members`),

  addMember: (projectId: string, memberPayload: Partial<Member>) =>
    apiFetch<Member[]>(`${PROJECTS_PATH}/${projectId}/members`, {
      method: "POST",
      body: memberPayload,
    }),

  removeMember: (projectId: string, memberId: string) =>
    apiFetch<void>(`${PROJECTS_PATH}/${projectId}/members/${memberId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),
};