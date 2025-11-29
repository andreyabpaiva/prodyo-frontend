import { Member, User } from "@/types/domain";
import { apiFetch } from "./api-client";

const USERS_PATH = "/users";
const MEMBERS_PATH = "/members";

export type UpsertUserPayload = {
  name: string;
  email: string;
  password?: string;
  role?: string;
};

export const userService = {
  list: () => apiFetch<User[]>(USERS_PATH),

  getById: (userId: string) => apiFetch<User>(`${USERS_PATH}/${userId}`),

  create: (payload: UpsertUserPayload) =>
    apiFetch<User>(USERS_PATH, {
      method: "POST",
      body: payload,
    }),

  update: (userId: string, payload: Partial<UpsertUserPayload>) =>
    apiFetch<User>(`${USERS_PATH}/${userId}`, {
      method: "PUT",
      body: payload,
    }),
};

export const memberService = {
  list: (params?: { projectId?: string }) =>
    apiFetch<Member[]>(MEMBERS_PATH, { params }),

  linkToProject: (projectId: string, userId: string, role?: string) =>
    apiFetch<Member>(MEMBERS_PATH, {
      method: "POST",
      body: { projectId, userId, role },
    }),

  unlinkFromProject: (memberId: string) =>
    apiFetch<void>(`${MEMBERS_PATH}/${memberId}`, {
      method: "DELETE",
      skipJsonParsing: true,
    }),
};

