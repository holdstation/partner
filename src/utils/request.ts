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

  return fetch(requestUrl, requestInit);
}
