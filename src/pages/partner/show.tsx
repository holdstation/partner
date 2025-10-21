import { CanAccess, useNavigation, useShow } from "@refinedev/core";
import dayjs from "dayjs";

import { PartnerType } from "@/types/partner";
import { Show, Breadcrumb } from "@refinedev/antd";
import { FieldOrderDetail } from "@/components/orders/field-order-detail";
import { Card, Col, Divider, Grid, Row, Space, Typography } from "antd";
import { PartnerConfigList } from "../partner-config";
import { Outlet } from "react-router";
import { Notfound } from "@/components/not-found";
import { getOrderType } from "../partner-config/data";
import { formatDisplay } from "@/utils/format-display";
const { useBreakpoint } = Grid;

export function PartnerShow() {
  const {
    result: partner,
    query: { isLoading },
  } = useShow<PartnerType>({
    resource: "partner",
    dataProviderName: "partner",
  });
  const { list } = useNavigation();
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  return (
    <CanAccess resource="partner" action="show" fallback={<Notfound />}>
      <>
        <Row gutter={[32, 32]}>
          <Col xs={24} xl={12}>
            <Show
              resource="partner"
              isLoading={isLoading}
              headerProps={{ onBack: () => list("partner") }}
              breadcrumb={<Breadcrumb hideIcons={true} showHome={true} />}
              title={
                <Typography.Title level={4} style={{ marginBottom: 0 }}>
                  Partner Info
                </Typography.Title>
              }
            >
              <div className="flex flex-col gap-3">
                <FieldOrderDetail label="ID:" value={partner?.id} />
                <FieldOrderDetail label="Name:" value={partner?.name} />
                <FieldOrderDetail
                  label="Description:"
                  value={partner?.description}
                />
                <FieldOrderDetail
                  label="Buffer rate:"
                  value={partner?.buffer_rate.toString()}
                />
              
                <FieldOrderDetail
                  label="Created At:"
                  value={
                    partner
                      ? dayjs(partner.created_at.seconds * 1000).format(
                          "DD/MM/YYYY HH:mm"
                        )
                      : null
                  }
                />
                <FieldOrderDetail
                  label="Updated At:"
                  value={
                    partner
                      ? dayjs(partner.updated_at.seconds * 1000).format(
                          "DD/MM/YYYY HH:mm"
                        )
                      : null
                  }
                />
                <div className="flex flex-col md:flex-row flex-wrap gap-2 self-start">
                  <Typography.Text
                    type="secondary"
                    className="min-w-40 md:text-right"
                  >
                    Limit:
                  </Typography.Text>
                  {partner?.limit ? (
                    <Card size="small">
                      <Space
                        direction="vertical"
                        split={<Divider size="small" type="horizontal" />}
                      >
                        {partner?.limit?.map((e, index) => (
                          <Space
                            key={`buffer_rate-${index}`}
                            direction={isMobile ? "vertical" : "horizontal"}
                            size={"small"}
                            split={
                              isMobile ? null : <Divider type="vertical" />
                            }
                          >
                            <div className="flex flex-row gap-1">
                              <Typography.Text type="secondary">
                                Order Type:
                              </Typography.Text>
                              <Typography.Text>
                                {getOrderType(e.order_type)}
                              </Typography.Text>
                            </div>
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
                          </Space>
                        ))}
                      </Space>
                    </Card>
                  ) : null}
                </div>
              </div>
            </Show>
          </Col>

          <Col xs={24} xl={12}>
            <PartnerConfigList />
          </Col>
        </Row>
        <Outlet />
      </>
    </CanAccess>
  );
}
