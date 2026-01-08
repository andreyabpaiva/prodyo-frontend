import type {
  HandlersLoginRequest,
  HandlersLoginResponse,
  HandlersRegisterRequest,
} from "@/apis/data-contracts";
import { apiFetch } from "./api-client";
import { Auth } from "@/apis/Auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081/api/v1";

const AUTH_PATH = "/auth";
const authApi = new Auth({
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

})

export type LoginPayload = HandlersLoginRequest;
export type RegisterPayload = HandlersRegisterRequest;



export const authService = {


  login: async (payload: LoginPayload) => {
    const response = await authApi.loginCreate(payload);
    return response.data;
  },

  register: async (payload: RegisterPayload) => {
    const response = await authApi.registerCreate(payload);
    return response.data;
  },

  logout: () =>
    apiFetch<void>(`${AUTH_PATH}/logout`, {
      method: "POST",
      skipJsonParsing: true,
    }),
};

