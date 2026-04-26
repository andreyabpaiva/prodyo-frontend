import type {
  HandlersCreateIndicatorRequest,
  HandlersCreateActionRequest,
  HandlersCreateCauseRequest,
  HandlersPatchActionRequest,
} from "@/apis/data-contracts";

export type CreateIndicatorPayload = HandlersCreateIndicatorRequest;
export type CreateActionPayload = HandlersCreateActionRequest;
export type CreateCausePayload = HandlersCreateCauseRequest;
export type PatchActionPayload = HandlersPatchActionRequest;
