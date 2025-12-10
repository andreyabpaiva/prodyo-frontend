import { Bug } from "@/types/domain";
import { apiFetch } from "./api-client";
import type { HandlersCreateBugRequest } from "@/apis/data-contracts";

const BUGS_PATH = "/bugs";

export type CreateBugPayload = HandlersCreateBugRequest;

export const bugService = {
  list: (params: { task_id: string }) =>
    apiFetch<Bug[]>(BUGS_PATH, { params }),

  getById: (bugId: string) => apiFetch<Bug>(`${BUGS_PATH}/${bugId}`),

  create: (payload: CreateBugPayload) =>
    apiFetch<Record<string, any>>(BUGS_PATH, {
      method: "POST",
      body: payload,
    }),
};

