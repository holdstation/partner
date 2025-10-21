import { useLogin } from "@refinedev/core";
import { Spin } from "antd";
import { useEffect } from "react";

export function AuthCallback() {
  const { mutateAsync } = useLogin();

  useEffect(() => {
    mutateAsync({})
      .then((e) => {
        console.log("Login:", e);
      })
      .catch((err) => console.log("err:", err));
  }, [mutateAsync]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spin />
    </div>
  );
}
