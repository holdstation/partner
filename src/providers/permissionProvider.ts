import { request } from "@/utils/request";
import {
  DataProvider,
  GetListResponse,
} from "@refinedev/core";

export const permissionProvider: DataProvider = {
  getList: async function <UserPermission>(): Promise<
    GetListResponse<UserPermission>
  > {
    const response = await request("/api/roles/staffs");
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
    const data = (await response.json()) as UserPermission[];

    return {
      data: data,
      total: data.length,
    };
  },
  getOne: async function ({id}) {
    const res = await request(`/api/roles/staffs/${id}`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    return { data: data };
  },
  create: function () {
    throw new Error("Function not implemented.");
  },
  update: async function ({ variables, id }) {
    const v = variables as any;
    const path = v.type == "assign" ? "assign" : "remove";
    const response = await request(`/api/roles/${path}`, {
      method: "POST",
      body: JSON.stringify({
        role: v.role,
        user_id: id,
      }),
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
    const data = await response.json();

    return { data: data };
  },
  deleteOne: function () {
    throw new Error("Function not implemented.");
  },
  getApiUrl: function (): string {
    throw new Error("Function not implemented.");
  },
};
