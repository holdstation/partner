import { formatAddress } from "@/utils/format-address";
import { formatDisplay } from "@/utils/format-display";
import { getLinkTxHash } from "@/utils/getLinkTxHash";

import { List, TagField, TextField, useTable, UrlField, getDefaultFilter } from "@refinedev/antd";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import { filterStatusData, getLabelColorOrderStatus, getLabelColorProcessingState, getLabelOrderStatus, getLabelProcessingState, processingStatusData } from "./module/data";
import { EyeIcon } from "@/icons";
import { CanAccess, useNavigation } from "@refinedev/core";
import { InputSearch } from "@/components/input-search";
import { RangePickerFilter } from "@/components/range-picker";
import { LabelSort } from "@/components/label-sort";
import { Notfound } from "@/components/not-found";
import { OrderType } from "@/types/order";

export function DepositList() {
  const { tableProps ,filters} = useTable<OrderType>({
    syncWithLocation: true,
    resource: "deposit",
  });

  const { show } = useNavigation();

  return (
    <CanAccess resource="deposit" action="list" fallback={<Notfound />}>
      <List title="Deposit List" resource="deposit">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 mb-6 ">
          <div className="w-full">
            <InputSearch />
          </div>
          <div className="w-full">
            <RangePickerFilter />
          </div>
        </div>
        <Table {...tableProps} rowKey="id" rowClassName="whitespace-nowrap" className="">
          <Table.Column
            dataIndex="partner_ids"
            title="Partner"
            render={(_, record: OrderType) => <TextField value={record.partner?.name} />}
          />

          <Table.Column
            dataIndex="id"
            title="Order No"
            render={(value) => <TextField value={formatAddress(value)} copyable={{ text: value }} />}
          />

          <Table.Column
            dataIndex="amount"
            title={() => {
              return <LabelSort value="Amount" sortValue={"4"} sortKey="sort_by" />;
            }}
            render={(value: string) => (
              <TextField className="text-right w-full block" value={`${formatDisplay(Number(value), {})} VND`} />
            )}
          />

          <Table.Column
            dataIndex="outcome"
            title="Amount Received"
            render={(value: string) => (
              <TextField className="text-right w-full block" value={`${formatDisplay(Number(value), {})} USDT`} />
            )}
          />

          <Table.Column
            dataIndex="recipient"
            title="Wallet Address"
            render={(value: string) => (
              <TextField className="text-right" value={formatAddress(value)} copyable={{ text: value }} />
            )}
          />

          <Table.Column
            dataIndex="transactions"
            title="TX Hash"
            render={(value: OrderType["transactions"]) => (
              <div className="flex flex-col gap-1">
                {value?.map((i) => {
                  return (
                    <UrlField className="text-right" value={getLinkTxHash(i.tx_hash, i.chain_id)} target="_blank">
                      {formatAddress(i.tx_hash)}
                    </UrlField>
                  );
                })}
              </div>
            )}
          />

          <Table.Column
            dataIndex="order_statuses"
            title="Status"
            render={(_: number, item: OrderType) => (
              <TagField color={getLabelColorOrderStatus(item.state)} value={getLabelOrderStatus(item.state)} />
            )}
            filters={filterStatusData}
          />

          <Table.Column
            dataIndex="processing_states"
            title="Processing Status"
            filteredValue={getDefaultFilter("processing_states", filters, "in")}
            render={(_: number, item: OrderType) => (
              <TagField
                color={getLabelColorProcessingState(item.processing_state)}
                value={getLabelProcessingState(item.processing_state)}
              />
            )}
            filters={processingStatusData}
          />

          <Table.Column
            dataIndex="created_at"
            title={() => {
              return <LabelSort value="Created At" sortValue={"1"} sortKey="sort_by" />;
            }}
            render={(value: OrderType["created_at"]) => (
              <TextField value={dayjs(value.seconds * 1000).format("YYYY-MM-DD HH:mm")} />
            )}
          />

          <Table.Column
            dataIndex="updated_at"
            title={() => {
              return <LabelSort value="Updated At" sortValue={"2"} sortKey="sort_by" />;
            }}
            render={(value: OrderType["created_at"]) => (
              <TextField value={dayjs(value.seconds * 1000).format("YYYY-MM-DD HH:mm")} />
            )}
          />

          <Table.Column
            dataIndex="Actions"
            title="Actions"
            fixed="right"
            render={(_, item: OrderType) => (
              <div className="flex flex-row items-center">
                <CanAccess action="show" resource="deposit">
                  <Button
                    onClick={() => {
                      show("deposit", item.id);
                    }}
                    icon={
                      <div>
                        <EyeIcon className="w-4 h-4" />
                      </div>
                    }
                  ></Button>
                </CanAccess>
              </div>
            )}
          />
        </Table>
      </List>
    </CanAccess>
  );
}
