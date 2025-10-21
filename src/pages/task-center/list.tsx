import { Notfound } from "@/components/not-found";
import { List, useTable } from "@refinedev/antd";
import { CanAccess } from "@refinedev/core";
import { Table } from "antd";

export function TaskCenterList() {
  const { tableProps } = useTable<any>({
    syncWithLocation: true,
    resource: "taskCenter",
  });

  return (
    <CanAccess resource="taskCenter" action="list" fallback={<Notfound />}>
      <List resource="taskCenter" title="Task Center">
        <Table
          {...tableProps}
          rowKey="id"
          rowClassName="whitespace-nowrap"
          className=""
        ></Table>
      </List>
    </CanAccess>
  );
}
