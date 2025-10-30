import { useLogin } from "@refinedev/core";
import { useEffect, useMemo } from "react";
import { Outlet, useSearchParams } from "react-router";

export function AuthCallback() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutateAsync } = useLogin();

  const check = useMemo(() => {
    return searchParams.get("to")?.startsWith("/login?flow=");
  }, [searchParams]);

  useEffect(() => {
    mutateAsync({ type: check ? "" : "check" })
      .then()
      .catch(() => {
        setSearchParams((params) => {
          params.delete("to");
          return params;
        });
      });
  }, [check, mutateAsync, setSearchParams]);

  return <Outlet />;
}
