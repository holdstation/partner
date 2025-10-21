import { Roles } from "@/types/permission";
import { request } from "@/utils/request";
import useSWR from "swr";

export function useRoles() {
  const response = useSWR(
    `/api/roles`,
    async (url: string) => {
      const res = await request(url);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      return (data?.roles || []) as Roles[];
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
    }
  );

  return response;
}
