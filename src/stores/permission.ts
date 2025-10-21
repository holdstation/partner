const statistics = [
  {
    api: "/api/statistics/revenue/total",
    method: "GET",
  },
  {
    api: "/api/statistics/transaction/total",
    method: "GET",
  },
  {
    api: "/api/statistics/transaction/volume",
    method: "GET",
  },
  {
    api: "/api/statistics/users/active",
    method: "GET",
  },
  {
    api: "/api/statistics/users/total",
    method: "GET",
  },
  {
    api: "/api/statistics/volumes/offramp",
    method: "GET",
  },
  {
    api: "/api/statistics/volumes/onramp",
    method: "GET",
  },
  {
    api: "/api/statistics/volumes/total",
    method: "GET",
  },
];

const orders = [
  {
    api: "/api/orders",
    method: "GET",
  },
  {
    api: "/api/orders/{id}",
    method: "DELETE",
  },
  {
    api: "/api/orders/{id}",
    method: "GET",
  },
  {
    api: "/api/orders/{id}/transactions",
    method: "GET",
  },
];

const partners = [
  {
    api: "/api/partners",
    method: "GET",
  },
  {
    api: "/api/partners",
    method: "POST",
  },
  {
    api: "/api/partners/{id}",
    method: "PUT",
  },
];

const partnersConfig = [
  {
    api: "/api/partners/{id}/configs",
    method: "GET",
  },
  {
    api: "/api/partners/{id}/configs",
    method: "POST",
  },
  {
    api: "/api/partners/{id}/configs",
    method: "PUT",
  },
];

const roles = [
  {
    api: "/api/roles",
    method: "GET",
  },
  {
    api: "/api/roles/assign",
    method: "POST",
  },
  {
    api: "/api/roles/remove",
    method: "POST",
  },
  {
    api: "/api/roles/staffs",
    method: "GET",
  },
  {
    api: "/api/roles/staffs/{staff_id}",
    method: "GET",
  },
];

export const bodyCheckPermission = [
  ...orders,
  ...partners,
  ...partnersConfig,
  ...roles,
  ...statistics,
];

const statisticsPermission = [
  {
    api: "/api/statistics/revenue/total",
    method: "GET",
    action: "/revenue/total",
  },
  {
    api: "/api/statistics/transaction/total",
    method: "GET",
    action: "/transaction/total",
  },
  {
    api: "/api/statistics/transaction/volume",
    method: "GET",
    action: "/transaction/volume",
  },
  {
    api: "/api/statistics/users/active",
    method: "GET",
    action: "/users/active",
  },
  {
    api: "/api/statistics/users/total",
    method: "GET",
    action: "/users/total",
  },
  {
    api: "/api/statistics/volumes/offramp",
    method: "GET",
    action: "/volumes/offramp",
  },
  {
    api: "/api/statistics/volumes/onramp",
    method: "GET",
    action: "/volumes/onramp",
  },
  {
    api: "/api/statistics/volumes/total",
    method: "GET",
    action: "/volumes/total",
  },
];

const ordersPermission = [
  {
    api: "/api/orders",
    method: "GET",
    action: "list",
  },
  {
    api: "/api/orders/{id}",
    method: "DELETE",
    action: "delete",
  },
  {
    api: "/api/orders/{id}",
    method: "GET",
    action: "show",
  },
];

const partnersPermission = [
  {
    api: "/api/partners",
    method: "GET",
    action: "list",
  },
  {
    api: "/api/partners",
    method: "GET",
    action: "show",
  },
  {
    api: "/api/partners",
    method: "POST",
    action: "create",
  },
  {
    api: "/api/partners/{id}",
    method: "PUT",
    action: "edit",
  },
];

const partnersConfigPermission = [
  {
    api: "/api/partners/{id}/configs",
    method: "GET",
    action: "list",
  },
  {
    api: "/api/partners/{id}/configs",
    method: "POST",
    action: "create",
  },
  {
    api: "/api/partners/{id}/configs",
    method: "PUT",
    action: "edit",
  },
];

const rolesPermission = [
  {
    api: "/api/roles/assign",
    method: "POST",
    action: "assign",
  },
  {
    api: "/api/roles/remove",
    method: "POST",
    action: "remove",
  },
  {
    api: "/api/roles/assign",
    method: "POST",
    action: "edit",
  },
  {
    api: "/api/roles/staffs",
    method: "GET",
    action: "list",
  },
  {
    api: "/api/roles/staffs/{staff_id}",
    method: "GET",
    action: "show",
  },
];

const dataMapPermission = {
  roles: rolesPermission,
  overview: statisticsPermission,
  deposit: ordersPermission,
  withdraw: ordersPermission,
  partner: partnersPermission,
  partnerConfig: partnersConfigPermission,
};

export const getPermission = (
  dataResponse: { api: string; method: string; allowed: string }[]
) => {
 return Object.fromEntries(
    Object.entries(dataMapPermission).map(([key, endpoints]) => {
      const allowedActions = endpoints
        .filter((e2) =>
            dataResponse.some(
            (e1) => e1.api === e2.api && e1.method === e2.method && e1.allowed
          )
        )
        .map((e) => e.action);
      return [key, allowedActions];
    })
  );
};
