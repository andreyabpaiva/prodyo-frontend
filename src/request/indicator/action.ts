import { Indicators } from "@/apis/Indicators";
import { API_BASE_URL } from "@/request/api-client";
import type { ActionsPartialUpdateParams } from "@/apis/data-contracts";
import type {
  CreateActionPayload,
  CreateCausePayload,
  CreateIndicatorPayload,
  PatchActionPayload,
} from "./types";

const indicatorsApi = new Indicators({
  baseUrl: API_BASE_URL,
  securityWorker: () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      return { headers: { Authorization: `Bearer ${token}` } };
    }
    return {};
  },
});

export const indicatorAction = {
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

  patchAction: async (
    params: ActionsPartialUpdateParams,
    action: PatchActionPayload,
  ) => {
    const response = await indicatorsApi.actionsPartialUpdate(params, action);
    return response.data;
  },
};
