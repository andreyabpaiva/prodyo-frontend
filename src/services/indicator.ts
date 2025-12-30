import { Indicator } from "@/types/domain";
import { apiFetch } from "./api-client";
import type {
  HandlersCreateIndicatorRequest,
  HandlersCreateActionRequest,
  HandlersCreateCauseRequest,
  IndicatorsListParams,
  ActionsPartialUpdateParams,
  HandlersPatchActionRequest,
} from "@/apis/data-contracts";
import { Indicators } from "@/apis/Indicators";

const INDICATORS_PATH = "/indicators";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081/api/v1";

const indicatorsApi = new Indicators({
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

export type CreateIndicatorPayload = HandlersCreateIndicatorRequest;
export type CreateActionPayload = HandlersCreateActionRequest;
export type CreateCausePayload = HandlersCreateCauseRequest;
export type PatchActionPayload = HandlersPatchActionRequest;

export const indicatorService = {
  list: async (params: IndicatorsListParams) => {
    const response = await indicatorsApi.indicatorsList(params);
    return response.data;
  },
  create: async (payload: CreateIndicatorPayload) => {
    const response = await indicatorsApi.indicatorsCreate(payload);
    return response.data;
  },
  createAction: async (payload: CreateActionPayload) => {
    const response = await indicatorsApi.actionsCreate(payload);
    return response.data;
  },
  createCause: async (payload: CreateCausePayload) => {
    const response = await indicatorsApi.causesCreate(payload);
    return response.data;
  },
  patchAction: async (params: ActionsPartialUpdateParams, action: PatchActionPayload) => {
    const response = await indicatorsApi.actionsPartialUpdate(params, action);
    return response.data;
  }
};

