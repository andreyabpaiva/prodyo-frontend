/**
 * @deprecated Actions are now created through the indicator service.
 * Use indicatorService.createAction() instead.
 */
import type { HandlersCreateActionRequest } from "@/apis/data-contracts";
import { indicatorService } from "./indicator";

export type CreateActionPayload = HandlersCreateActionRequest;

/**
 * @deprecated Use indicatorService.createAction() instead.
 * Actions are created via the /indicators/actions endpoint.
 */
export const actionService = {
  /**
   * @deprecated Use indicatorService.createAction() instead.
   */
  create: (payload: CreateActionPayload) =>
    indicatorService.createAction(payload),
};

