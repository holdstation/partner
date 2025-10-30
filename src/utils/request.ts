import { TOKEN_KEY } from "@/providers/authProvider";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function request(url: string, init: RequestInit = {}) {
  const requestInit = init;
  let requestUrl = url;

  const auth = localStorage.getItem(TOKEN_KEY) || "";
  const localData = JSON.parse(auth);

  if (!url.startsWith("http")) {
    requestUrl = `${BASE_URL}${url}`;
  }

  requestInit.headers = {
    ...requestInit.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${localData.tokenized}`,
  };

  const response = await fetch(requestUrl, requestInit);

  if (response.status == 401) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("kratos_registration_flow");
    window.location.href = "/";
  }
  return response;
}
