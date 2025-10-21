import { DataProvider, GetListResponse } from "@refinedev/core";
import { generateFilter } from "@refinedev/simple-rest";
import { stringify } from "query-string";
import { validate } from "uuid";
import { isAddress } from "ethers";

import { request } from "@/utils/request";
import dayjs from "dayjs";

export const depositProvider: DataProvider = {
  // required methods
  getList: async ({
    pagination,
    filters,
    meta,
  }): Promise<GetListResponse<any>> => {
    const { currentPage, pageSize } = pagination || {};
    const partAPI = "/api/orders";
    const queryFilters = generateFilter(filters);
    const keyword = meta?.keyword;
    const metaQuery: Record<string, string> = {};
    if (keyword) {
      if (validate(keyword)) {
        metaQuery["order_id"] = keyword;
      } else if (isAddress(keyword)) {
        metaQuery["recipient"] = keyword;
      } else {
        metaQuery["keyword"] = keyword;
      }
    }

    if (meta?.created_at_from) {
      metaQuery["created_at_from"] = String(
        Math.floor(dayjs(meta.created_at_from).toDate().getTime() / 1000)
      );
    }

    if (meta?.created_at_to) {
      metaQuery["created_at_to"] = String(
        Math.floor(dayjs(meta.created_at_to).endOf('day').toDate().getTime() / 1000)
      );
    }

    if (meta?.sort_by) {
      metaQuery["sort_by"] = meta.sort_by;
    }
    const mapQueryFilters = Object.fromEntries(
      Object.entries(queryFilters).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, value.join(",")];
        }
        return [key, value];
      })
    );

    const combinedQuery = {
      order_types: "1",
      page: currentPage || "1",
      page_size: pageSize || "10",
      ...metaQuery,
      ...mapQueryFilters,
    };

    const filtered = Object.fromEntries(
      Object.entries(combinedQuery).filter(([_, v]) => !!v)
    );

    const urlWithQuery = Object.keys(filtered).length
      ? `${partAPI}?${stringify(filtered)}`
      : partAPI;

    const response = await request(urlWithQuery, { method: "GET" });
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
      data: result.orders,
      total: result.total_count,
    };
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
  getOne: async ({ id }) => {
    const response = await request(`/api/orders/${id}`, { method: "GET" });
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
  //   getMany: ({ resource, ids, meta }) => Promise,
  //   createMany: ({ resource, variables, meta }) => Promise,
  //   deleteMany: ({ resource, ids, variables, meta }) => Promise,
  //   updateMany: ({ resource, ids, variables, meta }) => Promise,
  //   custom: ({ url, method, filters, sorters, payload, query, headers, meta }) =>
  //     Promise,
};
