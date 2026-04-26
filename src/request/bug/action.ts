import { Bugs } from "@/apis/Bugs";
import { API_BASE_URL } from "@/request/api-client";
import type { CreateBugPayload } from "./types";

const bugsApi = new Bugs({
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

export const bugAction = {
  create: async (payload: CreateBugPayload) => {
    const response = await bugsApi.bugsCreate(payload);
    return response.data;
  },
};
