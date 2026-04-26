import { Users } from "@/apis/Users";
import { API_BASE_URL } from "@/request/api-client";
import type { ProjectDetailParams, UsersListParams } from "@/apis/data-contracts";

const usersApi = new Users({
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

export const userQuery = {
  list: async (params?: UsersListParams) => {
    const response = await usersApi.usersList(params || {});
    return response.data;
  },

  projectDetail: async (params: ProjectDetailParams) => {
    const response = await usersApi.projectDetail(params);
    return response.data;
  },
};
