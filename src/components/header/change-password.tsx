import { Button, Flex, Modal } from "antd";
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
    const res = await fetch(
      `${import.meta.env.VITE_AUTH_URL}/self-service/login/browser`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      }
    );

    flow = await res.json();
    saveFlow(flow);
  }

  return flow;
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
      <Modal
        open={open}
        title="Change Password"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {open ? <FormChangePassword onClose={handleCancel} /> : null}
      </Modal>
    </>
  );
}

function FormChangePassword(props: { onClose: () => void }) {
 
  const [flow, setFlow] = useState(false);
  console.log(flow);

  const handleGetFlow = useCallback(async () => {
    const flow = await getChangePasswordFlow();
    setFlow(flow);
  }, []);

  useEffect(() => {
    handleGetFlow();
  }, [handleGetFlow]);

  return (
    <div>
      <div>111</div>
      <Flex className="mt-4" justify="end">
        <Button
          onClick={() => {
            props.onClose();
          }}
        >
          Close
        </Button>
      </Flex>
    </div>
  );
}
