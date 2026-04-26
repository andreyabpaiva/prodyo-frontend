import { Auth } from "@/apis/Auth";
import { apiFetch, API_BASE_URL } from "@/request/api-client";
import type { LoginPayload, RegisterPayload } from "./types";

const authApi = new Auth({
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

export const authAction = {
  login: async (payload: LoginPayload) => {
    const response = await authApi.loginCreate(payload);
    return response.data;
  },

  register: async (payload: RegisterPayload) => {
    const response = await authApi.registerCreate(payload);
    return response.data;
  },

  logout: () =>
    apiFetch<void>("/auth/logout", {
      method: "POST",
      skipJsonParsing: true,
    }),
};
