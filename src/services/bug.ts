import { Bug } from "@/types/domain";
import { apiFetch } from "./api-client";
import { Bugs } from "@/apis/Bugs";
import type {
  BugsListParams,
  HandlersCreateBugRequest,
} from "@/apis/data-contracts";

const BUGS_PATH = "/bugs";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081/api/v1";

const bugsApi = new Bugs({
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

export type CreateBugPayload = HandlersCreateBugRequest;

export const bugService = {
  list: async (params: BugsListParams) => {
    const response = await bugsApi.bugsList(params);
    return response.data;
  },

  getById: (bugId: string) => apiFetch<Bug>(`${BUGS_PATH}/${bugId}`),

  create: (payload: CreateBugPayload) =>
    apiFetch<Record<string, any>>(BUGS_PATH, {
      method: "POST",
      body: payload,
    }),
};

