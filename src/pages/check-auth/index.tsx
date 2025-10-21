import { useLogin } from "@refinedev/core";
import { useEffect } from "react";
import { Outlet } from "react-router";

export function AuthCallback() {
  const { mutate } = useLogin();

  useEffect(() => {
    mutate({ type: "check" });
  }, [mutate]);

  return <Outlet />;
}
