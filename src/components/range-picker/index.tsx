import { useQueryParams } from "@/utils/use-query-params";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export function RangePickerFilter() {
  const { get, setMulti, removeMulti } = useQueryParams();

  const createFrom = get("created_at_from");
  const createTo = get("created_at_to");

  return (
    <RangePicker
      allowClear={true}
      defaultValue={
        createFrom && createTo
          ? [dayjs(createFrom), dayjs(createTo)]
          : undefined
      }
      onChange={(_, dateStrings) => {
        if (dateStrings[0] && dateStrings[1]) {
          setMulti({
            created_at_from: dateStrings[0],
            created_at_to: dateStrings[1],
          });
        } else {
          removeMulti(["created_at_from", "created_at_to"]);
        }
      }}
    />
  );
}
