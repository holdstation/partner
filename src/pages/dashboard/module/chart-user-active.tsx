import { StatisticType } from "@/types/statistic";
import { useCustom } from "@refinedev/core";
import { Card, Empty, Flex, Segmented, Typography } from "antd";
import { useMemo, useState } from "react";
import { Column } from "@ant-design/plots";
import { useTheme } from "@/stores/theme";
import { useShallow } from "zustand/react/shallow";

function getLimit(value: string) {
  switch (value) {
    case "Day":
      return "7";

    case "Week":
      return "4";

    case "Month":
      return "6";
    default:
      return "7";
  }
}

export function ChartUserActive() {
  const [interval, setFilterInterval] = useState("Day");
  const [theme] = useTheme(
    useShallow((state) => [state.theme, state.setTheme])
  );

  const {
    result,
    query: { isLoading },
  } = useCustom<StatisticType>({
    dataProviderName: "statistics",
    url: "users/active",
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

    const temp1 = list1.map((e) => {
      return { ...e, name: label1 };
    });

    return temp1;
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
          <Typography.Title level={4}>Active Users</Typography.Title>
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
            theme={{ type: theme === "light" ? "dark" : "light" }}
          />
        )}
      </Flex>
    </Card>
  );
}
