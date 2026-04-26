import { Indicators } from "@/apis/Indicators";
import { API_BASE_URL } from "@/request/api-client";
import type { IndicatorsListParams } from "@/apis/data-contracts";

const indicatorsApi = new Indicators({
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

export const indicatorQuery = {
  list: async (params: IndicatorsListParams) => {
    const response = await indicatorsApi.indicatorsList(params);
    return response.data;
  },
};
