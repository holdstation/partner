import { type AccessControlProvider } from "@refinedev/core";
import { TOKEN_KEY } from "./providers/authProvider";
import { request } from "./utils/request";
import { bodyCheckPermission, getPermission } from "./stores/permission";

const CACHE_DURATION = 30 * 60 * 1000; // 30 phút = 1800000 ms
const isProd = import.meta.env.MODE === "production";

export async function fetchPermission(localData: any) {
  try {
    if (
      localData &&
      localData.permission &&
      localData.permission.data &&
      localData.permission.timestamp
    ) {
      const isExpired =
        Date.now() - localData.permission.timestamp > CACHE_DURATION;
      if (!isExpired) {
        const permiss = getPermission(localData.permission.data);

        const overview = permiss?.overview || [];
        const rolePermissions = {
          ...permiss,
          overview: ["list", ...overview],
          taskCenter: isProd
            ? []
            : ["list", "show", "create", "edit", "delete"],
        };
        return rolePermissions;
      }
    }

    const res = await request(`/api/permissions`, {
      method: "POST",
      body: JSON.stringify(bodyCheckPermission),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();

    const newData = {
      ...localData,
      permission: {
        data: data,
        timestamp: Date.now(),
      },
    };

    localStorage.setItem(TOKEN_KEY, JSON.stringify(newData));

    const permiss = getPermission(data);

    const overview = permiss?.overview || [];
    const rolePermissions = {
      ...permiss,
      overview: ["list", ...overview],
      taskCenter: isProd ? [] : ["list", "show", "create", "edit", "delete"],
    };
    return rolePermissions;
  } catch (error) {
    console.log("Permission error:", error);
    return {
      overview: ["list"],
      taskCenter: isProd ? [] : ["list", "show", "create", "edit", "delete"],
    };
  }
}

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action }) => {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return { can: false };

    // const localData = JSON.parse(raw);

    // const data = await fetchPermission(localData);

    const permissions: Record<string, string[]> = {
      overview: [
        "list",
        "/revenue/total",
        "/transaction/total",
        "/transaction/volume",
        "/users/active",
        "/users/total",
        "/volumes/offramp",
        "/volumes/onramp",
        "/volumes/total",
      ],
      deposit: ["list", "show"],
      withdraw: ["list", "show"],
    };
    return {
      can: permissions[resource || ""]?.includes(action) ?? false,
    };
  },
  options: {
    buttons: {
      hideIfUnauthorized: true,
    },
  },
};
