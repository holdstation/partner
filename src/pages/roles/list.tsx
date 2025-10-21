import { Notfound } from "@/components/not-found";
import { Roles, UserPermission } from "@/types/permission";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { List, TagField, useTable } from "@refinedev/antd";
import { CanAccess } from "@refinedev/core";
import { Avatar, Button, Flex, Table, Typography } from "antd";
import { Outlet, useNavigate } from "react-router";

function getColorByRole(role: Roles) {
  if (role === "admin") {
    return "red";
  }

  if (role === "order_editor") {
    return "cyan";
  }
  if (role === "order_viewer") {
    return "blue";
  }
  if (role === "partner_editor") {
    return "lime";
  }
  if (role === "partner_viewer") {
    return "green";
  }
  if (role === "user_editor") {
    return "purple";
  }
  if (role === "user_viewer") {
    return "geekblue";
  }
}

export function ListUsersWithRoles() {
  const { tableProps } = useTable<UserPermission>({
    syncWithLocation: true,
    resource: "roles",
  });

  const navigate = useNavigate();

  return (
    <CanAccess resource="roles" action="list" fallback={<Notfound />}>
      <List title="Users" resource="roles" breadcrumb={null}>
        <Table
          {...tableProps}
          rowKey="id"
          rowClassName="whitespace-nowrap"
          className=""
        >
          <Table.Column
            dataIndex="user"
            title="User"
            render={(_, record: UserPermission) => (
              <Flex align="center" gap={12}>
                <Avatar>
                  {record?.identity.traits?.name ||
                    record?.identity.traits?.email}
                </Avatar>
                <Flex vertical={true}>
                  <Typography.Text strong>
                    {record?.identity.traits?.name}
                  </Typography.Text>
                  <Typography.Text>
                    {record?.identity.traits?.email}
                  </Typography.Text>
                </Flex>
              </Flex>
            )}
          />

          <Table.Column
            dataIndex="roles"
            title="Roles"
            render={(value: Roles[]) => (
              <Flex align="center" gap={8} wrap>
                {value?.map((i) => {
                  return (
                    <TagField
                      key={i}
                      value={i.split("_").join(" ")}
                      style={{ textTransform: "capitalize" }}
                      color={getColorByRole(i)}
                    />
                  );
                })}
              </Flex>
            )}
          />
          <Table.Column
            dataIndex="Actions"
            title="Add Role"
            fixed="right"
            render={(_, record: UserPermission) => (
              <Flex align="center" gap={8} wrap>
                <CanAccess resource="roles" action="assign">
                  <Button
                    onClick={() => {
                      navigate(`/roles/edit/${record.identity.id}/assign`);
                    }}
                    icon={<PlusCircleOutlined />}
                  ></Button>
                </CanAccess>
                <CanAccess resource="roles" action="remove">
                  <Button
                    onClick={() => {
                        navigate(`/roles/edit/${record.identity.id}/remove`);
                    }}
                    icon={<MinusCircleOutlined />}
                  ></Button>
                </CanAccess>
              </Flex>
            )}
          />
        </Table>
      </List>
      <Outlet />
    </CanAccess>
  );
}
