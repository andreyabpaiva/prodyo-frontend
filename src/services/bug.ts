import { Bug, ProductivityLevel } from "@/types/domain";
import { apiFetch } from "./api-client";

const BUGS_PATH = "/bugs";

export type UpsertBugPayload = {
  taskId: string;
  number: number;
  description: string;
  severity: ProductivityLevel;
  assigneeId: string;
};

export const bugService = {
  list: (params?: { taskId?: string }) =>
    apiFetch<Bug[]>(BUGS_PATH, { params }),

  getById: (bugId: string) => apiFetch<Bug>(`${BUGS_PATH}/${bugId}`),

  create: (payload: UpsertBugPayload) =>
    apiFetch<Bug>(BUGS_PATH, {
      method: "POST",
      body: payload,
    }),

  update: (bugId: string, payload: Partial<UpsertBugPayload>) =>
    apiFetch<Bug>(`${BUGS_PATH}/${bugId}`, {
      method: "PUT",
      body: payload,
    }),

  delete: (bugId: string) =>
    apiFetch<void>(`${BUGS_PATH}/${bugId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),
};

