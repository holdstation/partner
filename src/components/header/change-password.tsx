import { LoadingOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Modal, Result, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";

function saveFlow(flow: any) {
  localStorage.setItem("kratos_change_password_flow", JSON.stringify(flow));
}

function loadFlow() {
  const raw = localStorage.getItem("kratos_change_password_flow");

  if (!raw) return null;

  const flow = JSON.parse(raw);
  const expiresAt = new Date(flow.expires_at).getTime();
  const now = Date.now();

  if (now > expiresAt) {
    // flow đã hết hạn
    localStorage.removeItem("kratos_change_password_flow");

    return null;
  }

  return flow;
}

async function getChangePasswordFlow() {
  let flow = loadFlow();
  if (!flow) {
    // tạo flow mới
    const res = await fetch(`${import.meta.env.VITE_AUTH_URL}/self-service/settings/browser`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    flow = await res.json();
    if (res.ok) {
      saveFlow(flow);
    }
  }

  return flow;
}

function extractMethodAndCsrf(flow: any) {
  if (!flow) {
    return { method: "", csrf_token: "", action: "", email: "" };
  }
  let csrf_token: string = "";
  let method: string | undefined;
  let email: string = "";

  for (const node of flow.ui.nodes) {
    const { name, value, type } = node.attributes;

    // lấy csrf_token
    if (name === "csrf_token") {
      csrf_token = value || "";
    }

    if (name === "traits.email" && type == "email") {
      email = value || "";
    }

    // lấy method (submit button có type=submit)
    if (name === "method" && type === "submit") {
      method = value;
    }
  }

  return { method, csrf_token: csrf_token, action: flow.ui.action, email };
}

function SubmitForm({ action, csrfToken, password }: { action: string; csrfToken: string; password: string }) {
  const form = document.createElement("form");

  form.method = "POST";
  form.action = action;

  // Add CSRF token
  const csrfInput = document.createElement("input");

  csrfInput.type = "hidden";
  csrfInput.name = "csrf_token";
  csrfInput.value = csrfToken;
  form.appendChild(csrfInput);

  // Add CSRF token
  const passwordInput = document.createElement("input");

  passwordInput.type = "password";
  passwordInput.name = "password";
  passwordInput.value = password;
  form.appendChild(passwordInput);

  // Add CSRF token
  const methodInput = document.createElement("input");

  methodInput.type = "hidden";
  methodInput.name = "method";
  methodInput.value = "password";
  form.appendChild(methodInput);

  // Submit form
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

export function ChangePassword() {
  const [open, setOpen] = useState(false);

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        type="text"
        style={{
          width: "100%",
          justifyContent: "start",
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Change Password
      </Button>
      <Modal open={open} title="Change Password" onOk={handleOk} onCancel={handleCancel} footer={null}>
        {open ? <FormChangePassword onClose={handleCancel} /> : null}
      </Modal>
    </>
  );
}

function FormChangePassword(props: { onClose: () => void }) {
  const [flow, setFlow] = useState();
  const [loading, setLoading] = useState(false);

  const { csrf_token, action } = extractMethodAndCsrf(flow);
  const [form] = Form.useForm();

  const handleGetFlow = useCallback(async () => {
    setLoading(true);
    try {
      const flow = await getChangePasswordFlow();
      setFlow(flow);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetFlow();
  }, [handleGetFlow]);

  if (loading) {
    return (
      <Flex align="center" gap="middle" justify="center">
        <Spin indicator={<LoadingOutlined spin />} />
      </Flex>
    );
  }

  if (!loading && !flow) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access"
        extra={
          <Button
            type="primary"
            onClick={() => {
              props.onClose();
            }}
          >
            Close
          </Button>
        }
      />
    );
  }

  return (
    <div className="mt-6">
      <Form
        {...form}
        layout="vertical"
        onFinish={(value) => {
          console.log(value)
          SubmitForm({
            action: action,
            csrfToken: csrf_token,
            password: value.password,
          });
        }}
      >
        <Form.Item
          label="Password"
          name="password"
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
          <Input name="password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="password2"
          required
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The new password that you entered do not match!"));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Flex className="mt-4" justify="end" gap={8}>
            <Button
              onClick={() => {
                props.onClose();
              }}
            >
              Close
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
}
