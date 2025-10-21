import { useQueryParams } from "@/utils/use-query-params";
import { Input } from "antd";

export function InputSearch() {
  const { get, set, remove } = useQueryParams();

  const searchValue = get("keyword");
  // const [currentValue, setCurrentValue] = useState<string | null | undefined>(
  //   searchValue || ""
  // );

  return (
    <Input.Search
      placeholder="Search by Order No or Wallet Address"
      title="Search"
      allowClear
      onSearch={(value, _, info) => {
        if (info?.source === "clear") {
          remove("keyword");
          return;
        }
        set("keyword", value);
      }}
      defaultValue={searchValue || ""}
    />
  );
}
