import { Button, Card, Form, Input, Layout, Spin, Typography } from "antd";
import { SwitchTheme } from "@/components/switch-theme";
import { useCallback, useState } from "react";
import {
  extractMethodAndCsrf,
  getOrCreateFlow,
  submitForm,
} from "@/providers/authProvider";
import { LoadingOutlined } from "@ant-design/icons";
import { useNotification } from "@refinedev/core";

export function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const  { open } = useNotification()

  const handleLogin = useCallback(async (values: any) => {
    setLoading(true);
   try {
    const flow = await getOrCreateFlow();
    const { csrf_token } = extractMethodAndCsrf(flow);
    submitForm(flow.ui.action, csrf_token, values.email, values.password);
    setLoading(false);
   } catch (_) {
    open?.({
      type:'error',
      message:"Login Error",
      description:"Invalid credentials"
    })
    setLoading(false);

   }
  }, [open]);

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
                disabled={loading}
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
                    disabled={loading}
                  >
                    {loading ? (
                      <Spin
                        indicator={<LoadingOutlined spin />}
                        size="default"
                      />
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </Form.Item>
              </Form>

              <div className="mt-5 flex items-center justify-between">
                <SwitchTheme />
              </div>
            </div>
          </div>
        </Card>
      </Layout.Content>
    </Layout>
  );
}
