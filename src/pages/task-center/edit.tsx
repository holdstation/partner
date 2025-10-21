import { Create } from "@refinedev/antd";
import { CanAccess } from "@refinedev/core";

export function TaskCenterEdit() {
  return (
    <CanAccess action="edit" resource="taskCenter">
      <Create resource="taskCenter" title="Edit Task"></Create>
    </CanAccess>
  );
}
