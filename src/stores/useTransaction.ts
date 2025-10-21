import { TransferInfo } from "@/types/deposit";
import { request } from "@/utils/request";
import useSWR from "swr";

export function useTransaction(partner_id?: number | string) {
  const response = useSWR(
    partner_id ? `/api/orders/${partner_id}/transactions` : null,
    async (url: string) => {
      const res = await request(url);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      return data as TransferInfo[]
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
    }
  );

  return response;
}
