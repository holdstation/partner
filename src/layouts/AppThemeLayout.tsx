import { UserDropdown } from "@/components/header/user-dropdown";
import { SwitchTheme } from "@/components/switch-theme";
import { HoldstationIcon } from "@/icons";
import { ThemedLayout } from "@refinedev/antd";
import { theme, Layout } from "antd";
import { Link, Outlet } from "react-router";
import { ThemedSider } from "./ThemedSider";
const { Header } = Layout;

export function CustomLayout() {
  const {
    token: { colorTextBase, colorBgElevated },
  } = theme.useToken();

  return (
    <ThemedLayout
      Sider={() => (
        <ThemedSider
          Title={() => (
            <Link
              to={"/"}
              style={{
                color: colorTextBase,
              }}
            >
              <HoldstationIcon />
            </Link>
          )}
          fixed={true}
          render={({ items }) => {
            return items
          }}
        />
      )}
      Header={() => (
        <Header
          style={{
            padding: "0 16px",
            background: colorBgElevated,
            display: "flex",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 999,
          }}
        >
          <div className="h-full flex items-center "></div>
          <div className="flex flex-row items-center justify-end gap-2">
            <SwitchTheme />
            <UserDropdown />
          </div>
        </Header>
      )}
    >
      <Outlet />
    </ThemedLayout>
  );
}
