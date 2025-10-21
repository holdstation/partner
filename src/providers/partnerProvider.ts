import { DataProvider, GetListResponse } from "@refinedev/core";

import { request } from "@/utils/request";

export const partnerProvider: DataProvider = {
  // required methods
  getList: async ({ pagination }): Promise<GetListResponse<any>> => {
    const searchParams = new URLSearchParams();

    searchParams.set("page", String(pagination?.currentPage || "1"));
    searchParams.set("page_size", String(pagination?.pageSize || "10"));

    const url =
      searchParams.size > 0
        ? `/api/partners?${searchParams.toString()}`
        : `/api/partners`;
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
      total: result.length,
    };
  },
  create: async ({ variables }) => {
    const response = await request(`/api/partners`, {
      method: "POST",
      body: JSON.stringify(variables),
    });

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
  update: async ({ id, variables }) => {
    const response = await request(`/api/partners/${id}`, {
      method: "PUT",
      body: JSON.stringify(variables),
    });

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
  deleteOne: async () => {
    throw new Error("Not implemented");
  },
  getOne: async ({ id }) => {
    const searchParams = new URLSearchParams();
    const _ids = id;

    searchParams.set("ids", String(_ids));

    const url =
      searchParams.size > 0
        ? `/api/partners?${searchParams.toString()}`
        : `/api/partners`;
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
      data: result?.[0],
    };
  },
  getApiUrl: () => "",
  // optional methods
  getMany: async ({ ids }) => {
    const searchParams = new URLSearchParams();
    const _ids = ids.join(",");

    searchParams.set("ids", String(_ids));

    const url =
      searchParams.size > 0
        ? `/api/partners?${searchParams.toString()}`
        : `/api/partners`;
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
  //   createMany: ({ resource, variables, meta }) => Promise,
  //   deleteMany: ({ resource, ids, variables, meta }) => Promise,
  //   updateMany: ({ resource, ids, variables, meta }) => Promise,
  //   custom: ({ url, method, filters, sorters, payload, query, headers, meta }) =>
  //     Promise,
};
