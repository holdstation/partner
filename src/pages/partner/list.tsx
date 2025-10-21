import { Notfound } from "@/components/not-found";
import { EyeIcon, PencilIcon } from "@/icons";
import { PartnerType } from "@/types/partner";
import { formatAddress } from "@/utils/format-address";

import { List, TextField, useTable } from "@refinedev/antd";
import { CanAccess, useCan, useNavigation } from "@refinedev/core";
import { Button, Space, Table } from "antd";
import dayjs from "dayjs";

export function PartnerList() {
  const { tableProps } = useTable<PartnerType>({
    syncWithLocation: true,
    resource: "partner",
  });
  const { data: permissionCreate } = useCan({
    resource: "partner",
    action: "create",
  });

  const { show, edit } = useNavigation();

  return (
    <CanAccess resource="partner" action="list" fallback={<Notfound />}>
      <List title="Partner List" canCreate={permissionCreate?.can}>
        <Table
          {...tableProps}
          rowKey="id"
          rowClassName="whitespace-nowrap"
          className=""
        >
          <Table.Column
            dataIndex="id"
            title="Partner"
            render={(value: string) => (
              <TextField
                value={formatAddress(value)}
                copyable={{ text: value }}
              />
            )}
          />
          {/* <Table.Column
            dataIndex="app_key"
            title="App Key"
            render={(value: string) => (
              <TextField
                value={formatAddress(value)}
                copyable={{ text: value }}
              />
            )}
          /> */}

          <Table.Column
            dataIndex="name"
            title="Name"
            render={(value: string) => <TextField value={value} />}
          />

          <Table.Column
            dataIndex="buffer_rate"
            title="Buffer Rate"
            render={(value: string) => <TextField value={value} />}
          />
          <Table.Column
            dataIndex="created_at"
            title="Created At"
            render={(value: PartnerType["created_at"]) => (
              <TextField
                value={dayjs(value.seconds * 1000).format("YYYY-MM-DD HH:mm")}
              />
            )}
          />

          <Table.Column
            dataIndex="updated_at"
            title="Updated At"
            render={(value: PartnerType["updated_at"]) => (
              <TextField
                value={dayjs(value.seconds * 1000).format("YYYY-MM-DD HH:mm")}
              />
            )}
          />
          <Table.Column
            dataIndex="Actions"
            title="Actions"
            fixed="right"
            render={(_, item: PartnerType) => (
              <Space className="flex flex-row items-center">
                <CanAccess action="show" resource="partner">
                  <Button
                    onClick={() => {
                      show("partner", item.id);
                    }}
                    icon={
                      <div>
                        <EyeIcon className="w-4 h-4" />
                      </div>
                    }
                  ></Button>
                </CanAccess>
                <CanAccess action="edit" resource="partner">
                  <Button
                    onClick={() => {
                      edit("partner", item.id);
                    }}
                    icon={
                      <div>
                        <PencilIcon className="w-4 h-4" />
                      </div>
                    }
                  ></Button>
                </CanAccess>
              </Space>
            )}
          />
        </Table>
      </List>
    </CanAccess>
  );
}
