import {
  CanAccess,
  useGetIdentity,
  useLogout,
  useNavigation,
} from "@refinedev/core";
import { Avatar, Button, Popover, Typography } from "antd";
const { Text, Title } = Typography;

export function UserDropdown() {
  const { data } = useGetIdentity();
  const { mutate: logout } = useLogout();
  const { list } = useNavigation();

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
            <CanAccess resource="roles" action="list">
              <Button
                type="text"
                style={{
                  width: "100%",
                  justifyContent: "start",
                }}
                onClick={() => {
                  list("roles");
                }}
              >
                Permission
              </Button>
            </CanAccess>

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
