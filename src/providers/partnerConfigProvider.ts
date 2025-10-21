import { DataProvider, GetListResponse } from "@refinedev/core";

import { request } from "@/utils/request";

export const partnerConfigProvider: DataProvider = {
  // required methods
  getList: async ({ pagination, meta }): Promise<GetListResponse<any>> => {
    const searchParams = new URLSearchParams();

    searchParams.set("page", String(pagination?.currentPage || "1"));
    searchParams.set("page_size", String(pagination?.pageSize || "10"));

    const url =
      searchParams.size > 0
        ? `/api/partners/${meta?.id}/configs?${searchParams.toString()}`
        : `/api/partners/${meta?.id}/configs`;
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
  create: async ({ variables, meta }) => {
    const v = variables as any;
    const body: Record<string, any> = {};
    if (v.token_address) {
      body.token_address = v.token_address;
    }
    if (v.chain_id) {
      body.chain_id = v.chain_id;
    }
    if (v.buffer_rate) {
      body.buffer_rate = v.buffer_rate;
    }
    if (v.threshold && v.threshold.length > 0) {
      body.threshold = v.threshold;
    }
    const response = await request(`/api/partners/${meta?.id}/configs`, {
      method: "POST",
      body: JSON.stringify(body),
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

    return { data: result };
  },
  update: async ({ id, variables }) => {
    const v = variables as any;
    const body: Record<string, any> = {};
    if (v.token_address) {
      body.token_address = v.token_address;
    }
    if (v.chain_id) {
      body.chain_id = v.chain_id;
    }
    if (v.buffer_rate) {
      body.buffer_rate = v.buffer_rate;
    }
    if (v.threshold && v.threshold.length > 0) {
      body.threshold = v.threshold;
    }

    const response = await request(`/api/partners/${id}/configs`, {
      method: "PUT",
      body: JSON.stringify(body),
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
  getOne: async ({ id, meta }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", "1");
    searchParams.set("page_size", "100");
    const _ids = id;
    const _configId = Number(meta?.id_config);

    const url =
      searchParams.size > 0
        ? `/api/partners/${_ids}/configs?${searchParams.toString()}`
        : `/api/partners/${_ids}/configs`;
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
      data: result?.[_configId],
    };
  },
  getApiUrl: () => "",
  // optional methods
  // getMany: async ({ ids }) => {
  //   const searchParams = new URLSearchParams();
  //   const _ids = ids.join(",");

  //   searchParams.set("ids", String(_ids));

  //   const url =
  //     searchParams.size > 0
  //       ? `/api/partners?${searchParams.toString()}`
  //       : `/api/partners`;
  //   const response = await request(url, { method: "GET" });

  //   const result = await response.json();

  //   return {
  //     data: result,
  //   };
  // },
  //   createMany: ({ resource, variables, meta }) => Promise,
  //   deleteMany: ({ resource, ids, variables, meta }) => Promise,
  //   updateMany: ({ resource, ids, variables, meta }) => Promise,
  //   custom: ({ url, method, filters, sorters, payload, query, headers, meta }) =>
  //     Promise,
};
