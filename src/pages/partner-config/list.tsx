import { Notfound } from "@/components/not-found";
import { PencilIcon } from "@/icons";
import { PartnerConfigType } from "@/types/partner-config";
import { formatAddress } from "@/utils/format-address";
import {
  AppstoreOutlined,
  BarsOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { CreateButton, EditButton, TextField, useTable } from "@refinedev/antd";
import { CanAccess, useNavigation, useResourceParams } from "@refinedev/core";
import {
  Button,
  Card,
  Divider,
  Empty,
  Flex,
  Grid,
  Segmented,
  Space,
  Spin,
  Table,
  TableProps,
  Typography,
} from "antd";
import React, { useState } from "react";
import { getOrderType } from "./data";
import { formatDisplay } from "@/utils/format-display";

const { useBreakpoint } = Grid;

export function PartnerConfigList() {
  const {
    tableProps,
    result,
    tableQuery: { isLoading },
  } = useTable<PartnerConfigType>({
    dataProviderName: "partnerConfig",
    pagination: {
      currentPage: 1,
      pageSize: 100,
    },
  });

  const { id } = useResourceParams();
  const [tableView, setTableView] = useState<string>("Grid");

  return (
    <CanAccess action="list" resource="partnerConfig" fallback={<Notfound />}>
      <Card>
        <Flex
          align="center"
          justify="space-between"
          gap={8}
          wrap={true}
          style={{ marginBottom: 16 }}
        >
          <Typography.Title level={4}>Partner Config</Typography.Title>

          <Flex align="center" justify="end" gap={8}>
            <CanAccess action="create" resource="partnerConfig">
              <CreateButton resource="partnerConfig" meta={{ partnerId: id }} />
            </CanAccess>
            <Segmented
              options={[
                { value: "List", icon: <BarsOutlined /> },
                { value: "Grid", icon: <AppstoreOutlined /> },
              ]}
              onChange={(value) => {
                setTableView(value);
              }}
              value={tableView}
            />
          </Flex>
        </Flex>
        {tableView === "List" ? (
          <ListTable {...tableProps} />
        ) : (
          <GridTable result={result} loading={isLoading} />
        )}
      </Card>
    </CanAccess>
  );
}

function ListTable(tableProps: TableProps<PartnerConfigType>) {
  const { edit } = useNavigation();

  return (
    <Table {...tableProps} rowClassName="whitespace-nowrap" pagination={false}>
      <Table.Column
        dataIndex="token_address"
        title="Token Address"
        render={(value: string) =>
          value ? (
            <TextField
              value={formatAddress(value)}
              copyable={{ text: value }}
            />
          ) : (
            "N/A"
          )
        }
      />
      <Table.Column
        dataIndex="chain_id"
        title="Chain"
        render={(value: string) => <TextField value={value} />}
      />

      <Table.Column
        dataIndex="buffer_rate"
        title="Buffer Rate"
        render={(value: PartnerConfigType["buffer_rate"]) => (
          <Space direction="vertical">
            {value?.map((e, index) => (
              <React.Fragment key={`buffer_rate-${index}`}>
                {index !== 0 ? <Divider size="small" /> : null}
                <Space>
                  <Typography.Text type="secondary">
                    Order Type:
                  </Typography.Text>
                  <Typography.Text>
                    {getOrderType(e.order_type)}
                  </Typography.Text>
                  <Divider type="vertical" />
                  <Typography.Text type="secondary">Rate:</Typography.Text>
                  <Typography.Text>{e.rate}</Typography.Text>

                  {e.partner_share ? (
                    <>
                      <Divider type="vertical" />
                      <Typography.Text type="secondary">
                        Partner Share:
                      </Typography.Text>
                      <Typography.Text>{e.partner_share}</Typography.Text>
                    </>
                  ) : null}
                </Space>
              </React.Fragment>
            ))}
          </Space>
        )}
      />

      <Table.Column
        dataIndex="threshold"
        title="Threshold"
        render={(value: PartnerConfigType["threshold"]) => (
          <Space direction="vertical">
            {value?.map((e, index) => (
              <React.Fragment key={`threshold-${index}`}>
                {index !== 0 ? <Divider size="small" /> : null}
                <Space>
                  {e.min ? (
                    <>
                      <Typography.Text type="secondary">Min:</Typography.Text>
                      <Typography.Text>
                        {formatDisplay(e.min, {})}
                      </Typography.Text>
                      <Divider type="vertical" />
                    </>
                  ) : null}

                  {e.max ? (
                    <>
                      <Typography.Text type="secondary">Max:</Typography.Text>
                      <Typography.Text>
                        {formatDisplay(e.max, {})}
                      </Typography.Text>
                      <Divider type="vertical" />
                    </>
                  ) : null}

                  {e.provider ? (
                    <>
                      <Typography.Text type="secondary">
                        Provider:
                      </Typography.Text>
                      <Typography.Text>{e.provider}</Typography.Text>
                    </>
                  ) : null}
                </Space>
              </React.Fragment>
            ))}
          </Space>
        )}
      />

      <Table.Column
        dataIndex="Actions"
        title="Actions"
        fixed="right"
        render={(_, item: PartnerConfigType, index) => (
          <Button
            onClick={() => {
              edit("partnerConfig", item.partner_id, _, { id_config: index });
            }}
            icon={
              <div>
                <PencilIcon className="" />
              </div>
            }
          ></Button>
        )}
      />
    </Table>
  );
}

function GridTable(props: {
  loading: boolean;
  result: {
    data: PartnerConfigType[];
    total: number | undefined;
  };
}) {
  const { loading, result } = props;
  const { id } = useResourceParams();

  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  if (loading) {
    return (
      <Flex align="center" justify="center">
        <Spin indicator={<LoadingOutlined spin />} />
      </Flex>
    );
  }

  if (!result?.data || result?.data.length == 0) {
    return <Empty />;
  }

  return (
    <Flex vertical={true} gap="middle">
      {result.data.map((item, index) => {
        return (
          <Card>
            <Flex vertical={true} gap={16}>
              <Flex align="center" justify="space-between" gap={8}>
                <Space size={"small"}>
                  <Typography.Text type="secondary">
                    Token Address:
                  </Typography.Text>
                  <TextField
                    value={formatAddress(item.token_address || "N/A")}
                    copyable={
                      item.token_address ? { text: item.token_address } : false
                    }
                  />
                </Space>
                <EditButton
                  hideText
                  resource="partnerConfig"
                  recordItemId={id}
                  meta={{ partnerId: id, id_config: index }}
                />
              </Flex>
              <Space size={"small"}>
                <Typography.Text type="secondary">Chain:</Typography.Text>
                <TextField value={item.chain_id} />
              </Space>

              <Space size={"small"} align="start" direction="vertical">
                <Typography.Text type="secondary">Buffer Rate:</Typography.Text>
                <Card size="small">
                  <Space direction="vertical" wrap>
                    {item.buffer_rate?.map((e, index) => (
                      <React.Fragment key={`buffer_rate-${index}`}>
                        {index !== 0 ? <Divider size="small" /> : null}
                        <Space>
                          <Typography.Text type="secondary">
                            Order Type:
                          </Typography.Text>
                          <Typography.Text>
                            {getOrderType(e.order_type)}
                          </Typography.Text>
                          <Divider type="vertical" />
                          <Typography.Text type="secondary">
                            Rate:
                          </Typography.Text>
                          <Typography.Text>{e.rate}</Typography.Text>

                          {e.partner_share ? (
                            <>
                              <Divider type="vertical" />
                              <Typography.Text type="secondary">
                                Partner Share:
                              </Typography.Text>
                              <Typography.Text>
                                {e.partner_share}
                              </Typography.Text>
                            </>
                          ) : null}
                        </Space>
                      </React.Fragment>
                    ))}
                  </Space>
                </Card>
              </Space>

              <Space size={"small"} align="start" direction="vertical">
                <Typography.Text type="secondary">Threshold:</Typography.Text>
                <Card size="small">
                  <Space
                    direction="vertical"
                    split={<Divider size="small" />}
                    wrap
                  >
                    {item.threshold?.map((e, index) => {
                      return (
                        <React.Fragment key={`threshold-${index}`}>
                          <Space
                            direction={isMobile ? "vertical" : "horizontal"}
                            split={
                              isMobile ? null : <Divider type="vertical" />
                            }
                          >
                            {e.min ? (
                              <div className="flex flex-row gap-1">
                                <Typography.Text type="secondary">
                                  Min:
                                </Typography.Text>
                                <Typography.Text>
                                  {formatDisplay(e.min, {})}
                                </Typography.Text>
                              </div>
                            ) : null}

                            {e.max ? (
                              <div className="flex flex-row gap-1">
                                <Typography.Text type="secondary">
                                  Max:
                                </Typography.Text>
                                <Typography.Text>
                                  {formatDisplay(e.max, {})}
                                </Typography.Text>
                              </div>
                            ) : null}

                            {e.provider ? (
                              <div className="flex flex-row gap-1">
                                <Typography.Text type="secondary">
                                  Provider:
                                </Typography.Text>
                                <Typography.Text>{e.provider}</Typography.Text>
                              </div>
                            ) : null}
                          </Space>
                        </React.Fragment>
                      );
                    })}
                  </Space>
                </Card>
              </Space>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
}
