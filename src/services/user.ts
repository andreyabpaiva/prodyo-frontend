import { User } from "@/types/domain";
import { apiFetch } from "./api-client";
import { Users } from "@/apis/Users";
import type {
  HandlersCreateUserRequest,
  HandlersUpdateUserRequest,
  ProjectDetailParams,
  UsersListParams,
} from "@/apis/data-contracts";

const USERS_PATH = "/users";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081/api/v1";

const usersApi = new Users({
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

export type CreateUserPayload = HandlersCreateUserRequest;
export type UpdateUserPayload = HandlersUpdateUserRequest;

export const userService = {
  list: async (params?: UsersListParams) => {
    const response = await usersApi.usersList(params || {});
    return response.data;
  },

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

  projectDetail: async (params: ProjectDetailParams) => {
    const response = await usersApi.projectDetail(params);
    return response.data;
  },
};

