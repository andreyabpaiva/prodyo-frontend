import type {
  HandlersCreateTaskRequest,
  HandlersUpdateTaskRequest,
  HandlersPatchTaskRequest,
} from "@/apis/data-contracts";

export type CreateTaskPayload = HandlersCreateTaskRequest;
export type UpdateTaskPayload = HandlersUpdateTaskRequest;
export type PatchTaskPayload = HandlersPatchTaskRequest;
