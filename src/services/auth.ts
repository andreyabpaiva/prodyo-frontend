import { apiFetch } from "./api-client";
import type {
  HandlersLoginRequest,
  HandlersLoginResponse,
  HandlersRegisterRequest,
} from "@/apis/data-contracts";

const AUTH_PATH = "/auth";

export type LoginPayload = HandlersLoginRequest;
export type RegisterPayload = HandlersRegisterRequest;

export const authService = {
  login: (payload: LoginPayload) =>
    apiFetch<HandlersLoginResponse>(`${AUTH_PATH}/login`, {
      method: "POST",
      body: payload,
    }),

  register: (payload: RegisterPayload) =>
    apiFetch<Record<string, any>>(`${AUTH_PATH}/register`, {
      method: "POST",
      body: payload,
    }),

  logout: () =>
    apiFetch<void>(`${AUTH_PATH}/logout`, {
      method: "POST",
      skipJsonParsing: true,
    }),
};

