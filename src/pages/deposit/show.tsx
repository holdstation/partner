import {
  CanAccess,
  useCan,
  useMany,
  useNavigation,
  useResourceParams,
  useShow,
} from "@refinedev/core";
import dayjs from "dayjs";

import { DepositType } from "@/types/deposit";
import { formatDisplay } from "@/utils/format-display";
import { getColorStatus2, getStatus2 } from "./module/data";
import { Flex, Tag, Typography } from "antd";
import { Show, Breadcrumb } from "@refinedev/antd";
import {
  FieldOrderDetail,
  FieldOrderDetailStatus,
} from "@/components/orders/field-order-detail";
import { Notfound } from "@/components/not-found";
import { getNameChainById } from "@/stores/chains";
import { formatAddress } from "@/utils/format-address";
import { getLinkTxHash } from "@/utils/getLinkTxHash";
import { useBankInfo } from "@/stores/useBankInfo";
import { PartnerType } from "@/types/partner";
import { useTransaction } from "@/stores/useTransaction";

export function DepositShow() {
  const { id } = useResourceParams();
  const { list } = useNavigation();
  const { data } = useCan({ action: "list", resource: "partner" });

  const {
    result,
    query: { isLoading },
  } = useShow<DepositType>();
  const { data: bankInfo } = useBankInfo(result?.payment_info?.bank_id);

  const { data: transactions } = useTransaction(id);

  const { result: partnersData } = useMany<PartnerType>({
    resource: "partner", // Required: Specify the resource name for the data provider.
    ids: result?.partner_id ? [result.partner_id] : [], // Pass an empty array if no ID, rather than `[""]`.
    queryOptions: {
      enabled: !!result?.partner_id && data?.can, // Query is enabled only if `partner_id` exists.
    }
  });

  const partner = partnersData?.data?.[0];

  return (
    <CanAccess resource="deposit" action="show" fallback={<Notfound />}>
      <Show
        resource="deposit"
        isLoading={isLoading}
        canEdit={false}
        breadcrumb={<Breadcrumb hideIcons={true} showHome={true} />}
        headerProps={{ onBack: () => list("deposit") }}
        title={
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            Order Info
          </Typography.Title>
        }
      >
        <div className="flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <FieldOrderDetail label="Order No:" value={result?.id} />
              <FieldOrderDetail
                label="CVPay Order No:"
                value={result?.body?.payOrderId}
              />
              <FieldOrderDetail
                label="Partner:"
                value={
                  partner
                    ? `${partner.name}`
                    : null
                }
              />
              <FieldOrderDetail
                label="Create time:"
                value={
                  result
                    ? dayjs(result.created_at.seconds * 1000).format(
                        "DD/MM/YYYY HH:mm"
                      )
                    : null
                }
              />
              <FieldOrderDetail
                label="Update time:"
                value={
                  result
                    ? dayjs(result.updated_at.seconds * 1000).format(
                        "DD/MM/YYYY HH:mm"
                      )
                    : null
                }
              />
              <FieldOrderDetail
                label="Expired time:"
                value={
                  result
                    ? dayjs(result.expired_at.seconds * 1000).format(
                        "DD/MM/YYYY HH:mm"
                      )
                    : null
                }
              />

              <FieldOrderDetail label="Payment method:" value={"VietQR"} />
              {/* <FieldOrderDetail label="Refund times:" value={""} />
              <FieldOrderDetail label="Refund amount:" value={""} /> */}
              <FieldOrderDetailStatus
                label="Status:"
                value={
                  getStatus2(result?.state) ? (
                    <Tag color={getColorStatus2(result?.state)}>
                      {getStatus2(result?.state)}
                    </Tag>
                  ) : undefined
                }
              />
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <FieldOrderDetail
                label="Rate:"
                value={
                  result?.rate
                    ? `${formatDisplay(Number(result.rate), {})} VND`
                    : null
                }
              />

              <FieldOrderDetail
                label="Network:"
                value={getNameChainById(result?.chain_id)}
              />

              <FieldOrderDetail
                label="TX Hash:"
                render={() => {
                  if (!transactions) {
                    return null;
                  }
                  return (
                    <Flex vertical={true}>
                      {transactions.map((i) => {
                        return (
                          <Typography.Link
                            href={getLinkTxHash(i.tx_hash, i.chain_id)}
                            target="_blank"
                            copyable={{
                              text: i.tx_hash,
                            }}
                          >
                            {formatAddress(i.tx_hash)}
                          </Typography.Link>
                        );
                      })}
                    </Flex>
                  );
                }}
              />
              <FieldOrderDetail
                label="Total Payment:"
                value={
                  result?.amount
                    ? `${formatDisplay(Number(result.amount), {})} VND`
                    : null
                }
              />
              <FieldOrderDetail
                label="Amount Received"
                value={
                  result?.outcome
                    ? `${formatDisplay(Number(result?.outcome), {})} USDT`
                    : null
                }
              />
              <FieldOrderDetail label="Client IP:" value={result?.client_ip} />
            </div>
          </div>
          {result?.payment_info.account_number ? (
            <Flex vertical={true}>
              <Typography.Title level={4} style={{ marginTop: 24 }}>
                Payment Info
              </Typography.Title>
              <div className="flex flex-col gap-2">
                <FieldOrderDetail
                  label="Account number:"
                  value={result?.payment_info.account_number}
                />
                <FieldOrderDetail
                  label="Account name:"
                  value={result?.payment_info.full_name}
                />
                <FieldOrderDetail
                  label="Bank name:"
                  value={bankInfo?.short_name}
                />
              </div>
            </Flex>
          ) : null}

          {result?.error ? (
            <Flex vertical={true}>
              <Typography.Title level={4} style={{ marginTop: 24 }}>
                Error
              </Typography.Title>
              <div className="flex flex-col gap-2">
                {Object.entries(result.error).map(([key, value]) => {
                  return <FieldOrderDetail label={key} value={value} />;
                })}
              </div>
            </Flex>
          ) : null}
        </div>
      </Show>
    </CanAccess>
  );
}
