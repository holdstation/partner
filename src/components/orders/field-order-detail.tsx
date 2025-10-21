import { Typography } from "antd";
import { ReactNode } from "react";

const { Text } = Typography;

export function FieldOrderDetail(props: {
  label: string;
  value?: string | null | number;
  render?: () => ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-1 md:gap-2 md:items-center">
      <Text className="min-w-40 md:text-right" type="secondary">
        {props.label}
      </Text>
      {props.render ? props.render() : <Text>{props.value}</Text>}
    </div>
  );
}

export function FieldOrderDetailStatus(props: {
  label: string;
  value?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-1 md:gap-2 md:items-center">
      <Text className="min-w-40 md:text-right" type="secondary">
        {props.label}
      </Text>
      <div>{props.value}</div>
    </div>
  );
}
