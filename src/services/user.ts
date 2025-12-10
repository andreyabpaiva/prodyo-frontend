import { User } from "@/types/domain";
import { apiFetch } from "./api-client";
import type {
  HandlersCreateUserRequest,
  HandlersUpdateUserRequest,
} from "@/apis/data-contracts";

const USERS_PATH = "/users";

export type CreateUserPayload = HandlersCreateUserRequest;
export type UpdateUserPayload = HandlersUpdateUserRequest;

export const userService = {
  list: (params?: { page?: number; page_size?: number }) =>
    apiFetch<Record<string, any>>(USERS_PATH, { params }),

  getById: (userId: string) => apiFetch<User>(`${USERS_PATH}/${userId}`),

  create: (payload: CreateUserPayload) =>
    apiFetch<Record<string, any>>(USERS_PATH, {
      method: "POST",
      body: payload,
    }),

  update: (userId: string, payload: UpdateUserPayload) =>
    apiFetch<User>(`${USERS_PATH}/${userId}`, {
      method: "PUT",
      body: payload,
    }),

  delete: (userId: string) =>
    apiFetch<void>(`${USERS_PATH}/${userId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),
};

