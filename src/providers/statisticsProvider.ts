import { DataProvider, GetListResponse } from "@refinedev/core";

import { request } from "@/utils/request";

export const statisticsProvider: DataProvider = {
  // required methods
  getList: async (): Promise<GetListResponse<any>> => {
    throw new Error("Not implemented");
  },
  create: async () => {
    throw new Error("Not implemented");
  },
  update: async () => {
    throw new Error("Not implemented");
  },
  deleteOne: async () => {
    throw new Error("Not implemented");
  },
  getOne: async ({ id, meta }) => {
    const searchParams = new URLSearchParams();

    if (meta?.from) {
      searchParams.set("from", meta.from);
    }
    if (meta?.interval) {
      searchParams.set("interval", meta.interval);
    }
    if (meta?.limit) {
      searchParams.set("limit", meta.limit);
    }
    if (meta?.partner_id) {
      searchParams.set("partner_id", meta.partner_id);
    }
    if (meta?.to) {
      searchParams.set("to", meta.to);
    }

    // https://payment.capybera.xyz/cms/api/statistics/transaction/total
    const url =
      searchParams.size > 0
        ? `/api/statistics/${id}?${searchParams.toString()}`
        : `/api/statistics/${id}`;

    const response = await request(url, { method: "GET" });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(
        err?.detail ||
          err?.title ||
          err?.error ||
          err?.message ||
          "Fail to fetch"
      );
    }
    const result = await response.json();
    return {
      data: result,
    };
  },
  getApiUrl: () => "",
  // optional methods
  getMany: async () => {
    throw new Error("Not implemented");
  },
  custom: async (params) => {
    const { meta, url } = params;

    const searchParams = new URLSearchParams();

    if (meta?.from) {
      searchParams.set("from", meta.from);
    }
    if (meta?.interval) {
      searchParams.set("interval", meta.interval);
    }
    if (meta?.limit) {
      searchParams.set("limit", meta.limit);
    }
    if (meta?.partner_id) {
      searchParams.set("partner_id", meta.partner_id);
    }
    if (meta?.to) {
      searchParams.set("to", meta.to);
    }

    // https://payment.capybera.xyz/cms/api/statistics/transaction/total
    const urlCustom =
      searchParams.size > 0
        ? `/api/statistics/${url}?${searchParams.toString()}`
        : `/api/statistics/${url}`;

    const response = await request(urlCustom, { method: "GET" });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(
        err?.detail ||
          err?.title ||
          err?.error ||
          err?.message ||
          "Fail to fetch"
      );
    }
    const result = await response.json();
    return {
      data: result,
    };
  },
};
