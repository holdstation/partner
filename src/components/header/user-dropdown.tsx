import {
  useGetIdentity,
  useLogout,
} from "@refinedev/core";
import { Avatar, Button, Popover, Typography } from "antd";
import { ChangePassword } from "./change-password";
const { Text, Title } = Typography;

export function UserDropdown() {
  const { data } = useGetIdentity();
  const { mutate: logout } = useLogout();

  return (
    <div className="flex items-center gap-4">
      <Popover
        trigger="click"
        content={
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Title level={5} style={{ margin: 0 }}>
                {data?.name || data?.role}
              </Title>
              <Text strong>{data?.email}</Text>
            </div>
            <ChangePassword />
            <Button
              onClick={() => {
                logout();
              }}
              type="primary"
            >
              Log Out
            </Button>
          </div>
        }
        placement="bottomRight"
      >
        <Avatar>{data?.name || data?.email}</Avatar>
      </Popover>
    </div>
  );
}
