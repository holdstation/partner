import { Col, Layout, Result, Row } from "antd";
import { Onramp } from "./module/onramp";
import { Offramp } from "./module/offramp";
import { Total } from "./module/total";
import { TotalRevenue } from "./module/total-revenue";
import { TotalTransaction } from "./module/total-transaction";
import { TotalUsers } from "./module/total-user";
import { ChartTransactionVolume } from "./module/chart-transaction-volume";
import { ChartUserActive } from "./module/chart-user-active";
import { CanAccess, usePermissions } from "@refinedev/core";
import { Notfound } from "@/components/not-found";
import { SmileOutlined } from "@ant-design/icons";

export function Dashboard() {
  const { data } = usePermissions({});

  return (
    <CanAccess action="list" resource="overview" fallback={<Notfound />}>
      <Layout>
        {data?.overview.length === 1 ? (
          <Layout.Content>
            <Result
              icon={<SmileOutlined />}
              title="Welcome"
            />
          </Layout.Content>
        ) : (
          <Layout.Content>
            <Row gutter={[24, 24]}>
              <CanAccess resource="overview" action="/volumes/onramp">
                <Col xs={24} sm={24} xl={8}>
                  <Onramp />
                </Col>
              </CanAccess>

              <CanAccess resource="overview" action="/volumes/offramp">
                <Col xs={24} sm={24} xl={8}>
                  <Offramp />
                </Col>
              </CanAccess>

              <CanAccess resource="overview" action="/volumes/total">
                <Col xs={24} sm={24} xl={8}>
                  <Total />
                </Col>
              </CanAccess>

              <CanAccess resource="overview" action="/revenue/total">
                <Col xs={24} sm={24} xl={8}>
                  <TotalRevenue />
                </Col>
              </CanAccess>

              <CanAccess resource="overview" action="/transaction/total">
                <Col xs={24} sm={24} xl={8}>
                  <TotalTransaction />
                </Col>
              </CanAccess>
              <CanAccess resource="overview" action="/users/total">
                <Col xs={24} sm={24} xl={8}>
                  <TotalUsers />
                </Col>
              </CanAccess>
            </Row>
            <Row className="mt-6" gutter={[24, 24]}>
              <CanAccess resource="overview" action="/transaction/volume">
                <Col xs={24} sm={24} xl={16}>
                  <ChartTransactionVolume />
                </Col>
              </CanAccess>
              <CanAccess resource="overview" action="/users/active">
                <Col xs={24} sm={24} xl={8}>
                  <ChartUserActive />
                </Col>
              </CanAccess>
            </Row>
          </Layout.Content>
        )}
      </Layout>
    </CanAccess>
  );
}
