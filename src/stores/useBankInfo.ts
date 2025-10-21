import useSWR from "swr";

export function useBankInfo(id?: number | string) {
  const response = useSWR(
    id?   `https://pay-api.holdstation.com/api/v1/banks?ids=${id}`:null,
   async (url:string) => {

        const res = await fetch(url)
        if(!res.ok){
            throw new Error(res.statusText)
        }
        const data =await res.json()
        return data?.data?.banks?.[0]
    },{
        revalidateOnFocus:false,
        dedupingInterval:360_000
    }
  );

  return response
}
