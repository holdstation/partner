import { Route, Routes } from "react-router";
import { Authenticated, Refine } from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { authProvider } from "./providers/authProvider";
import { accessControlProvider } from "./access-control-provider";
import { depositProvider } from "./providers/depositProvider";
import { DepositList, DepositShow } from "./pages/deposit";
import { partnerProvider } from "./providers/partnerProvider";
import { ListIcon } from "./icons";
import { withdrawProvider } from "./providers/withdrawProvider";
import { WithdrawList, WithdrawShow } from "./pages/withdraw";

import { Login } from "@/pages/login";
import { AuthCallback } from "@/pages/check-auth";
import "@refinedev/antd/dist/reset.css";
import { App as AntdApp } from "antd";
import { ConfigTheme } from "./components/theme";
import { CustomLayout } from "./layouts/AppThemeLayout";
import { Dashboard } from "./pages/dashboard";
import {
  AppstoreOutlined,
  DollarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  PartnerEdit,
  PartnerCreate,
  PartnerShow,
  PartnerList,
} from "./pages/partner";
import { partnerConfigProvider } from "./providers/partnerConfigProvider";
import { PartnerConfigEdit, PartnerConfigCreate } from "./pages/partner-config";
import { statisticsProvider } from "./providers/statisticsProvider";
import { taskCenterProvider } from "./providers/taskCenterProvider";
import { Notfound } from "./components/not-found";
import {
  TaskCenterCreate,
  TaskCenterEdit,
  TaskCenterList,
  TaskCenterShow,
} from "./pages/task-center";
import { tasksProvider } from "./providers/tasksProvider";
import { permissionProvider } from "./providers/permissionProvider";
import { AssignRole, ListUsersWithRoles, RemoveRole } from "./pages/roles";
import { useNotificationProvider } from "./components/notification";

function App() {
  return (
    <ConfigTheme>
      <AntdApp>
        <Refine
          notificationProvider={useNotificationProvider}
          accessControlProvider={accessControlProvider}
          authProvider={authProvider}
          dataProvider={{
            default: dataProvider(import.meta.env.VITE_API_URL),
            deposit: depositProvider,
            partnerConfig: partnerConfigProvider,
            partner: partnerProvider,
            withdraw: withdrawProvider,
            statistics: statisticsProvider,
            taskCenter: taskCenterProvider,
            tasks: tasksProvider,
            roles: permissionProvider,
          }}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            projectId: "oPSgFo-8WUJoR-2GF4My",
          }}
          resources={[
            {
              name: "overview",
              list: "/",
              meta: {
                icon: (
                  <AppstoreOutlined
                    style={{
                      fontSize: 17,
                    }}
                  />
                ),
              },
            },
            {
              name: "roles",
              list: "/roles",
              edit: "/roles/edit/:id",
              meta: {
                dataProviderName: "roles",
                hide: true,
              },
            },
            {
              name: "deposit",
              list: "/deposit",
              edit: "/deposit/edit/:id",
              show: "/deposit/show/:id",
              meta: {
                dataProviderName: "deposit",
                icon: (
                  <DollarOutlined
                    style={{
                      fontSize: 17,
                    }}
                  />
                ),
              },
            },
            {
              name: "withdraw",
              list: "/withdraw",
              edit: "/withdraw/edit/:id",
              show: "/withdraw/show/:id",
              meta: {
                dataProviderName: "withdraw",
                label: "Withdrawals",
                icon: (
                  <DollarOutlined
                    style={{
                      fontSize: 17,
                    }}
                  />
                ),
              },
            },
            {
              name: "partner",
              list: "/partner",
              create: "/partner/create",
              edit: "/partner/edit/:id",
              show: "/partner/show/:id",
              meta: {
                dataProviderName: "partner",
                icon: (
                  <UserOutlined
                    style={{
                      fontSize: 17,
                    }}
                  />
                ),
              },
            },
            {
              name: "partnerConfig",
              create: "/partner/show/:id/config/create",
              edit: "/partner/show/:id/config/edit/:id_config",
              meta: {
                dataProviderName: "partnerConfig",
                icon: <ListIcon className="w-4 h-4" />,
              },
            },
            {
              name: "taskCenter",
              list: "/task-center",
              create: "/task-center/create",
              show: "/task-center/show/:id",
              edit: "/task-center/edit/:id",
              meta: {
                dataProviderName: "taskCenter",
                icon: <ListIcon className="w-4 h-4" />,
                label: "Task Center",
              },
            },
          ]}
          routerProvider={routerProvider}
        >
          <Routes>
            <Route
              element={
                <Authenticated
                  key="authenticated-inner"
                  fallback={<CatchAllNavigate to="/signin" />}
                >
                  <CustomLayout />
                </Authenticated>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="/deposit">
                <Route index element={<DepositList />} />
                <Route element={<DepositShow />} path="show/:id" />
              </Route>
              <Route path="/withdraw">
                <Route index element={<WithdrawList />} />
                <Route element={<WithdrawShow />} path="show/:id" />
              </Route>
              <Route path="/partner">
                <Route index element={<PartnerList />} />
                <Route element={<PartnerCreate />} path="create" />
                <Route element={<PartnerShow />} path="show/:id">
                  <Route index element={<></>}></Route>

                  <Route
                    path="config/create"
                    element={<PartnerConfigCreate />}
                  />
                  <Route
                    path="config/edit/:id_config"
                    element={<PartnerConfigEdit />}
                  />
                </Route>
                <Route element={<PartnerEdit />} path="edit/:id" />
              </Route>
              <Route path="/task-center">
                <Route index element={<TaskCenterList />} />
                <Route path="create" element={<TaskCenterCreate />} />
                <Route path="edit" element={<TaskCenterEdit />} />
                <Route path="show" element={<TaskCenterShow />} />
              </Route>
              <Route path="/roles" element={<ListUsersWithRoles />}>
                <Route index element={<></>} />
                <Route path="edit/:id/assign" element={<AssignRole />} />
                <Route path="edit/:id/remove" element={<RemoveRole />} />
              </Route>
              <Route path="*" element={<Notfound />}></Route>
            </Route>
            <Route
              element={
                <Authenticated
                  key="authenticated-outer"
                  fallback={<AuthCallback />}
                >
                  <NavigateToResource />
                </Authenticated>
              }
            >
              <Route element={<Login />} path="/signin" />
            </Route>
          </Routes>

          <UnsavedChangesNotifier />
          <DocumentTitleHandler
            handler={({ resource, action }) => {
              let title = "CMS CVPay"; // Default title
              if (resource && action) {
                title = `${resource?.meta?.label || resource?.name} ${action}`;
              }

              return title;
            }}
          />
        </Refine>
      </AntdApp>
    </ConfigTheme>
  );
}

export default App;
