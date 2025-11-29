import {
  Action,
  Cause,
  Indicator,
  MetricType,
  ProductivityLevel,
} from "@/types/domain";
import { apiFetch } from "./api-client";

const INDICATORS_PATH = "/indicators";

export type UpsertIndicatorPayload = {
  iterationId: string;
  metric: MetricType;
  labels: string[];
  valueSeries: number[];
  productivityLevel: ProductivityLevel;
};

export const indicatorService = {
  list: (params?: { iterationId?: string }) =>
    apiFetch<Indicator[]>(INDICATORS_PATH, { params }),

  getById: (indicatorId: string) =>
    apiFetch<Indicator>(`${INDICATORS_PATH}/${indicatorId}`),

  create: (payload: UpsertIndicatorPayload) =>
    apiFetch<Indicator>(INDICATORS_PATH, {
      method: "POST",
      body: payload,
    }),

  update: (indicatorId: string, payload: Partial<UpsertIndicatorPayload>) =>
    apiFetch<Indicator>(`${INDICATORS_PATH}/${indicatorId}`, {
      method: "PUT",
      body: payload,
    }),

  delete: (indicatorId: string) =>
    apiFetch<void>(`${INDICATORS_PATH}/${indicatorId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),

  getCauses: (indicatorId: string) =>
    apiFetch<Cause[]>(`${INDICATORS_PATH}/${indicatorId}/causes`),

  getActions: (indicatorId: string) =>
    apiFetch<Action[]>(`${INDICATORS_PATH}/${indicatorId}/actions`),
};

