import { StatisticType } from "@/types/statistic";
import { useCustom } from "@refinedev/core";
import { Card, Empty, Flex, Segmented, theme, Typography } from "antd";
import { useMemo, useState } from "react";
import { Column } from "@ant-design/plots";
import { useTheme } from "@/stores/theme";
import { useShallow } from "zustand/react/shallow";
import { formatDisplay } from "@/utils/format-display";

function formatNumber(num: number) {
  if (num >= 1_000_000_000)
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
}

function getLimit(value: string) {
  switch (value) {
    case "Day":
      return "14";

    case "Week":
      return "8";

    case "Month":
      return "12";
    default:
      return "14";
  }
}

export function ChartTransactionVolume() {
  const [interval, setFilterInterval] = useState("Day");
  const [themeMode] = useTheme(
    useShallow((state) => [state.theme, state.setTheme])
  );

  const {
    token: { colorText },
  } = theme.useToken();

  const {
    result,
    query: { isLoading },
  } = useCustom<StatisticType>({
    dataProviderName: "statistics",
    url: "transaction/volume",
    method: "get",
    errorNotification: false,
    meta: {
      interval: interval.toLowerCase(),
      limit: getLimit(interval),
    },
  });

  const data = useMemo(() => {
    if (!result) {
      return [];
    }
    const list1 = result.data.series?.[0].data || [];
    const label1 = result.data.series?.[0].name || "";

    const list2 = result.data.series?.[1].data || [];
    const label2 = result.data.series?.[1].name || "";
    const temp1 = list1.map((e) => {
      return { ...e, name: label1 };
    });
    const temp2 = list2.map((e) => {
      return { ...e, name: label2 };
    });
    return [...temp1, ...temp2];
  }, [result]);

  const config = {
    data: {
      type: "inline",
      value: data,
    },
    xField: "ts",
    yField: "value",
    colorField: "name",
    group: {
      padding: 0,
    },
    axis: {
      y: {
        labelFormatter: (datum: number) => {
          return formatNumber(datum);
        },
      },
    },
    interaction: {
      tooltip: {
        render: (_: any, { title, items }: any) => {
          return (
            <div
              key={title}
              style={{
                color: colorText,
              }}
            >
              <h5 style={{ color: colorText, fontSize: 16 }}>{title}</h5>
              {items.map((item: any) => {
                const { name, value, color } = item;
                return (
                  <div>
                    <div
                      style={{
                        margin: 0,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            display: "inline-block",
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: color,
                            marginRight: 6,
                          }}
                        ></span>
                        <span>{name}:</span>
                      </div>
                      <p className="pl-2">
                        {formatDisplay(value, {})}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        },
      },
    },
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
          <Typography.Title level={4}>Transaction Volume</Typography.Title>
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
          <Column
            {...config}
            theme={{ type: themeMode === "light" ? "dark" : "light" }}
          />
        )}
      </Flex>
    </Card>
  );
}
