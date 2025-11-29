import { Action, TaskStatus } from "@/types/domain";
import { apiFetch } from "./api-client";

const ACTIONS_PATH = "/actions";

export type UpsertActionPayload = {
  indicatorId: string;
  title: string;
  description: string;
  ownerId: string;
  status: TaskStatus;
  startDate: string;
  endDate: string;
};

export const actionService = {
  list: (params?: { indicatorId?: string }) =>
    apiFetch<Action[]>(ACTIONS_PATH, { params }),

  getById: (actionId: string) =>
    apiFetch<Action>(`${ACTIONS_PATH}/${actionId}`),

  create: (payload: UpsertActionPayload) =>
    apiFetch<Action>(ACTIONS_PATH, {
      method: "POST",
      body: payload,
    }),

  update: (actionId: string, payload: Partial<UpsertActionPayload>) =>
    apiFetch<Action>(`${ACTIONS_PATH}/${actionId}`, {
      method: "PUT",
      body: payload,
    }),

  delete: (actionId: string) =>
    apiFetch<void>(`${ACTIONS_PATH}/${actionId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),
};

