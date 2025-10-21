import { useLogin } from "@refinedev/core";
import { Button, Card, Form, Input, Layout, Typography } from "antd";
import { SwitchTheme } from "@/components/switch-theme";
import { useCallback } from "react";
const BASE_API = import.meta.env.VITE_AUTH_URL;

export function Login() {
  const { mutate: login } = useLogin();
  const [form] = Form.useForm();

  const handleLogin = useCallback(
    (values: any) => {
      login(values);
    },
    [login]
  );

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

      console.log("sessionData",sessionData)
    
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
          <div>
            <div className="mb-5 sm:mb-8">
              <Typography.Title level={3}>Sign In</Typography.Title>
              <Typography.Text>
                Enter your email and password to sign in!
              </Typography.Text>
            </div>

            <div>
              <Form
                form={form}
                layout="vertical"
                name="control-login"
                variant="underlined"
                onFinish={(val) => {
                  handleLogin(val);
                }}
                style={{ maxWidth: 600 }}
              >
                <Form.Item
                  name={"email"}
                  label={"Email"}
                  required
                  rules={[
                    {
                      required: true,
                      message: "Email is required",
                    },
                    {
                      type: "email",
                      message: "Invalid email address",
                    },
                  ]}
                >
                  <Input type="email" />
                </Form.Item>
                <Form.Item
                  name={"password"}
                  label={"Password"}
                  required
                  rules={[
                    {
                      required: true,
                      message: "Password is required",
                    },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="w-full"
                    type="primary"
                    size="large"
                    htmlType="submit"
                  >
                    Sign in
                  </Button>
                </Form.Item>
              </Form>

              <div className="mt-5 flex items-center justify-between">
                <SwitchTheme />
              </div>
            </div>
          </div>
          <Button onClick={() => {
            handleWhoami()
          }}>Whoami</Button>
        </Card>
      </Layout.Content>
    </Layout>
  );
}
