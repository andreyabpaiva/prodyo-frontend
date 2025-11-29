import { Cause, MetricType, ProductivityLevel, TaskStatus } from "@/types/domain";
import { apiFetch } from "./api-client";

const CAUSES_PATH = "/causes";

export type UpsertCausePayload = {
  indicatorId: string;
  metric: MetricType;
  description: string;
  productivityLevel: ProductivityLevel;
  assigneeId: string;
  status?: TaskStatus;
};

export const causeService = {
  list: (params?: { indicatorId?: string }) =>
    apiFetch<Cause[]>(CAUSES_PATH, { params }),

  getById: (causeId: string) => apiFetch<Cause>(`${CAUSES_PATH}/${causeId}`),

  create: (payload: UpsertCausePayload) =>
    apiFetch<Cause>(CAUSES_PATH, {
      method: "POST",
      body: payload,
    }),

  update: (causeId: string, payload: Partial<UpsertCausePayload>) =>
    apiFetch<Cause>(`${CAUSES_PATH}/${causeId}`, {
      method: "PUT",
      body: payload,
    }),

  delete: (causeId: string) =>
    apiFetch<void>(`${CAUSES_PATH}/${causeId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),
};

