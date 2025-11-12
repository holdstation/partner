import { useCustom } from "@refinedev/core";
import { Card, Empty, Flex, Segmented, Typography } from "antd";
import { useMemo, useState } from "react";
import { Column } from "@ant-design/plots";
import { useTheme } from "@/stores/theme";
import { useShallow } from "zustand/react/shallow";
import { formatDisplay } from "@/utils/format-display";

function formatNumber(num: number) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
}

function getLimit(value: string) {
  switch (value) {
    case "Day":
      return "7";

    case "Week":
      return "9";

    case "Month":
      return "12";
    default:
      return "7";
  }
}

interface PartnerOrderType {
  partner_order_summaries?: {
    partner_id: string;
    period: string;
    deposit_orders?: number;
    withdraw_orders?: number;
  }[];
}

export function ChartPartnerOrder() {
  const [interval, setFilterInterval] = useState("Day");
  const [themeMode] = useTheme(useShallow((state) => [state.theme, state.setTheme]));

  const {
    result,
    query: { isLoading },
  } = useCustom<PartnerOrderType>({
    dataProviderName: "statistics",
    url: "/partner/orders",
    method: "get",
    errorNotification: false,
    meta: {
      interval: interval.toLowerCase(),
      limit: getLimit(interval),
    },
  });

  const data = useMemo(() => {
    if (!result || !result?.data?.partner_order_summaries) {
      return [];
    }

    const temp1 = result.data.partner_order_summaries.map((e) => {
      return {
        partner_id: e.partner_id,
        period: e.period,
        value: e.deposit_orders || 0,
        group: "Deposit",
      };
    });
    const temp2 = result.data.partner_order_summaries.map((e) => {
      return {
        partner_id: e.partner_id,
        period: e.period,
        value: e.withdraw_orders || 0,
        group: "Withdraw",
      };
    });

    return [...temp1, ...temp2];
  }, [result]);

  const config = {
    children: [
      {
        data: data,
        type: "interval",
        yField: "value",
        seriesField: "group",
        colorField: "group",
        group: {
          groupBy: "group",
          padding: 0,
        },
        label: {
          text: "value",
          textBaseline: "bottom",
          position: "inside",
        },
        tooltip: {
          items: [
            (datum: any) => {
              return {
                name: `${datum.group}`,
                value: formatDisplay(datum.value, {}),
              };
            },
          ],
        },
        axis: {
          y: {
            labelFormatter: (datum: number) => {
              return formatNumber(datum);
            },
          },
        },
      },
    ],
    xField: "period",
  };

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
        <Flex vertical={false} align="center" justify="space-between">
          <Typography.Title level={4}>Transaction Count</Typography.Title>
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
          </Flex>
        </Flex>

        {isLoading ? (
          <div></div>
        ) : data.length === 0 ? (
          <Empty />
        ) : (
          <Column {...config} theme={{ type: themeMode === "light" ? "dark" : "light" }} />
        )}
      </Flex>
    </Card>
  );
}
