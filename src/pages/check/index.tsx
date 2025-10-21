import { Button, Card, Layout } from "antd";
import { useCallback } from "react";
const BASE_API = import.meta.env.VITE_AUTH_URL;

export function LoginCheck() {
  const handleWhoami = useCallback(async () => {
    const sessionUrl = `${BASE_API}/sessions/whoami?tokenize_as=jwt`;

    const response = await fetch(sessionUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const sessionData = await response.json();

      console.log("sessionData", sessionData);
    }
  }, []);

  return (
    <Layout>
      <Layout.Content
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Card className="w-full mx-auto max-w-lg">
          <Button
            onClick={() => {
              handleWhoami();
            }}
          >
            Whoami
          </Button>
        </Card>
      </Layout.Content>
    </Layout>
  );
}
