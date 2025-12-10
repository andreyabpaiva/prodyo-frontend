/**
 * @deprecated Causes are now created through the indicator service.
 * Use indicatorService.createCause() instead.
 */
import type { HandlersCreateCauseRequest } from "@/apis/data-contracts";
import { indicatorService } from "./indicator";

export type CreateCausePayload = HandlersCreateCauseRequest;

/**
 * @deprecated Use indicatorService.createCause() instead.
 * Causes are created via the /indicators/causes endpoint.
 */
export const causeService = {
  /**
   * @deprecated Use indicatorService.createCause() instead.
   */
  create: (payload: CreateCausePayload) =>
    indicatorService.createCause(payload),
};

