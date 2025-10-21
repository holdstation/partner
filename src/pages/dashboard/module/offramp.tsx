import { Card, Flex, Segmented, Spin, theme, Typography } from "antd";
import { RiseOutlined } from "@ant-design/icons";
import { formatDisplay } from "@/utils/format-display";
import { useCustom } from "@refinedev/core";
import { StatisticType } from "@/types/statistic";
import { useMemo, useState } from "react";
import { getTextPercent } from "./data";

export function Offramp() {
  const {
    token: { colorSuccessActive },
  } = theme.useToken();
  const [interval, setFilterInterval] = useState("Day");

  const {
    result,
    query: { isLoading },
  } = useCustom<StatisticType>({
    dataProviderName: "statistics",
    url: "volumes/offramp",
    method: "get",
    errorNotification: false,
    meta: {
      interval: interval.toLowerCase(),
    },
  });

  const data = useMemo(() => {
    if (!result?.data.series) {
      return undefined;
    }
    return result.data.series?.[0];
  }, [result.data.series]);

  return (
    <Card
      size="small"
      styles={{
        body: {
          padding: 16,
        },
      }}
    >
      <Flex gap={16} vertical={true}>
        <Flex vertical={false} justify="space-between">
          <Typography.Text>Offramp Volume (VND)</Typography.Text>
          <Flex vertical={false} gap={4}>
            <div>
              <Segmented
                options={["Day", "Week", "Month"]}
                value={interval}
                onChange={(value) => {
                  setFilterInterval(value);
                }}
              />
            </div>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: colorSuccessActive,
              }}
            >
              <RiseOutlined
                style={{
                  color: "white",
                  fontSize: 16,
                }}
              />
            </div>
          </Flex>
        </Flex>

        {isLoading ? (
          <Flex align="center" justify="center">
            <Spin />
          </Flex>
        ) : (
          <Flex vertical gap={1}>
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              {data?.data?.[0].value
                ? formatDisplay(data?.data?.[0].value, { decimalToShow: 2 })
                : "N/A"}
            </Typography.Title>
            <Typography.Text
              type={
                (data?.data?.[0]?.pct_change || 0) >= 0 ? "success" : "danger"
              }
            >
              {data?.data?.[0].pct_change
                ? `${
                    data.data[0].pct_change > 0 ? "+" : ""
                  }${formatDisplay(data.data[0].pct_change, { decimalToShow: 2 })}% vs ${getTextPercent(interval)}`
                : "N/A"}
            </Typography.Text>
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
