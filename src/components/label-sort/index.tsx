import { SortIcon } from "@/icons";
import { useQueryParams } from "@/utils/use-query-params";
import { theme } from "antd";
import { useCallback } from "react";

export function LabelSort(props: {
  sortKey: string;
  value: string;
  sortValue: string | number;
}) {
  const { sortKey, value, sortValue } = props;
  const { set, get, remove } = useQueryParams();
  const paramsValue = get(sortKey);

  const {
    token: { colorIcon, colorPrimary },
  } = theme.useToken();

  const handleClick = useCallback(() => {
    if (paramsValue === String(sortValue)) {
      remove(sortKey);
    } else {
      set(sortKey, String(sortValue));
    }
  }, [paramsValue, remove, set, sortKey, sortValue]);

  return (
    <div className="flex flex-row items-center justify-between">
      <span>{value}</span>
      <SortIcon
        className="w-3 h-3 cursor-pointer"
        style={{
          color: paramsValue === String(sortValue) ? colorPrimary : colorIcon,
        }}
        onClick={handleClick}
      />
    </div>
  );
}
