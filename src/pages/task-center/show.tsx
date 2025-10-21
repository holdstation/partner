import { Create } from "@refinedev/antd";
import { CanAccess } from "@refinedev/core";

export function TaskCenterShow() {
  return (
    <CanAccess action="show" resource="taskCenter">
      <Create resource="taskCenter" title="Task Info"></Create>
    </CanAccess>
  );
}
