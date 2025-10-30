import type { AuthProvider } from "@refinedev/core";

import { Configuration, FrontendApi } from "@ory/kratos-client";

export const TOKEN_KEY = "partner-auth";

const BASE_API = import.meta.env.VITE_AUTH_URL;

const frontend = new FrontendApi(
  new Configuration({
    basePath: BASE_API, // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true,
    },
  })
);

function saveFlow(flow: any) {
  localStorage.setItem("kratos_registration_flow", JSON.stringify(flow));
}

function loadFlow() {
  const raw = localStorage.getItem("kratos_registration_flow");

  if (!raw) return null;

  const flow = JSON.parse(raw);
  const expiresAt = new Date(flow.expires_at).getTime();
  const now = Date.now();

  if (now > expiresAt) {
    // flow đã hết hạn
    localStorage.removeItem("kratos_registration_flow");

    return null;
  }

  return flow;
}

export async function getOrCreateFlow() {
  let flow = loadFlow();

  if (!flow) {
    // tạo flow mới
    const res = await fetch(`${BASE_API}/self-service/login/browser`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    flow = await res.json();
    saveFlow(flow);
  }

  return flow;
}

type KratosFlow = {
  ui: {
    nodes: Array<{
      attributes: {
        name?: string;
        value?: string;
        type?: string;
        node_type?: string;
      };
    }>;
  };
};

export function extractMethodAndCsrf(flow: KratosFlow) {
  let csrf_token: string = "";
  let method: string | undefined;

  for (const node of flow.ui.nodes) {
    const { name, value, type } = node.attributes;

    // lấy csrf_token
    if (name === "csrf_token") {
      csrf_token = value || "";
    }

    // lấy method (submit button có type=submit)
    if (name === "method" && type === "submit") {
      method = value;
    }
  }

  return { method, csrf_token: csrf_token };
}

export function submitForm(
  action: string,
  csrfToken: string,
  email: string,
  password: string
): void {
  const form = document.createElement("form");

  form.method = "POST";
  form.action = `${action}&return_to=/hvx`;

  // Add CSRF token
  const csrfInput = document.createElement("input");

  csrfInput.type = "hidden";
  csrfInput.name = "csrf_token";
  csrfInput.value = csrfToken;
  form.appendChild(csrfInput);

  // Add CSRF token
  const emailInput = document.createElement("input");

  emailInput.type = "text";
  emailInput.name = "identifier";
  emailInput.value = email;
  form.appendChild(emailInput);

  // Add CSRF token
  const passwordInput = document.createElement("input");

  passwordInput.type = "password";
  passwordInput.name = "password";
  passwordInput.value = password;
  form.appendChild(passwordInput);

  // Add CSRF token
  const methodInput = document.createElement("input");

  methodInput.type = "hidden";
  methodInput.name = "method";
  methodInput.value = "password";
  form.appendChild(methodInput);

  // Submit form
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

export const authProvider: AuthProvider = {
  login: async ({ type }) => {
    try {
      const sessionUrl = `${BASE_API}/sessions/whoami?tokenize_as=jwt`;

      const response = await fetch(sessionUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401) {
        const { data: flow } = await frontend.createBrowserLogoutFlow();

        // Use the received token to "update" the flow and thus perform the logout
        await frontend.updateLogoutFlow({
          token: flow.logout_token,
        });
      }
      if (!response.ok) {
        throw new Error("Error");
      }
      const sessionData = await response.json();
      localStorage.setItem(TOKEN_KEY, JSON.stringify(sessionData));

      return {
        success: true,
        redirectTo: "/",
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      if (type === "check") {
        return {
          success: false,
          error: {
            name: "check",
            message: "check",
          },
        };
      }
    }

    return {
      success: false,
      error: {
        name: "Invalid credentials",
        message: "Login Error",
      },
    };
  },
  register: async () => {
    throw new Error("Not implemented");
  },
  logout: async () => {
    try {
      // Create a "logout flow" in Ory Identities
      const { data: flow } = await frontend.createBrowserLogoutFlow();

      // Use the received token to "update" the flow and thus perform the logout
      await frontend.updateLogoutFlow({
        token: flow.logout_token,
      });
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("kratos_registration_flow");

      return {
        success: true,
        redirectTo: "/signin",
      };
    } catch (error) {
      console.log(error);
      // The user could not be logged out
      // This typically happens if the token does not match the session,
      // or is otherwise malformed or missing
    }

    return {
      success: true,
      redirectTo: "/signin",
    };
  },
  check: async () => {
    const raw = localStorage.getItem(TOKEN_KEY);

    if (raw) {
      const expires_at = JSON.parse(raw).expires_at;
      if (Date.now() > new Date(expires_at).getTime()) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem("kratos_registration_flow");

        return {
          authenticated: false,
          redirectTo: "/signin",
        };
      }
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/signin",
    };
  },
  getPermissions: async () => {
    const raw = localStorage.getItem(TOKEN_KEY);

    if (!raw) return {};

    // const localData = JSON.parse(raw);
    // const data = await fetchPermission(localData);

    return {
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
  },

  getIdentity: async () => {
    const raw = localStorage.getItem(TOKEN_KEY);

    if (raw) {
      const localData = JSON.parse(raw);

      let role = "admin";
      if (localData?.identity?.id === "eff7c5ef-c1ef-4d56-93b5-848ad15d047b") {
        role = "manage";
      }

      return {
        id: localData?.identity?.id,
        name: localData?.identity?.traits?.name,
        email: localData?.identity?.traits?.email,
        role: role,
        avatar: "https://i.pravatar.cc/300",
      };
    }

    return null;
  },

  onError: async (error) => {
    return { error };
  },
};
