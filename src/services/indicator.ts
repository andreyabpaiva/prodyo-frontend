import { Indicator } from "@/types/domain";
import { apiFetch } from "./api-client";
import type {
  HandlersCreateIndicatorRequest,
  HandlersCreateActionRequest,
  HandlersCreateCauseRequest,
} from "@/apis/data-contracts";

const INDICATORS_PATH = "/indicators";

export type CreateIndicatorPayload = HandlersCreateIndicatorRequest;
export type CreateActionPayload = HandlersCreateActionRequest;
export type CreateCausePayload = HandlersCreateCauseRequest;

export const indicatorService = {
  list: (params: { iteration_id: string }) =>
    apiFetch<Indicator>(INDICATORS_PATH, { params }),

  create: (payload: CreateIndicatorPayload) =>
    apiFetch<Record<string, any>>(INDICATORS_PATH, {
      method: "POST",
      body: payload,
    }),

  createAction: (payload: CreateActionPayload) =>
    apiFetch<Record<string, any>>(`${INDICATORS_PATH}/actions`, {
      method: "POST",
      body: payload,
    }),

  createCause: (payload: CreateCausePayload) =>
    apiFetch<Record<string, any>>(`${INDICATORS_PATH}/causes`, {
      method: "POST",
      body: payload,
    }),
};

