import { PartnerType } from "@/types/partner";
import { FilterDropdown, getDefaultFilter, useSelect } from "@refinedev/antd";
import { Select } from "antd";

export function PartnerFilter(props: { filters: any; filterProps: any }) {
  const { filters, filterProps } = props;
  const { selectProps } = useSelect<PartnerType>({
    resource: "partner",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: getDefaultFilter("partner_ids", filters, "eq"),
  });


  return (
    <FilterDropdown {...filterProps} key={"partner_ids"}>
      <Select
        mode="multiple"
        placeholder="Select Category"
        className="min-w-52"
        {...selectProps}
      />
    </FilterDropdown>
  );
}
