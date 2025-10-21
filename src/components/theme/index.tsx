import { useTheme } from "@/stores/theme";
import { useShallow } from 'zustand/react/shallow'

import { ConfigProvider, theme as ThemeAntd } from "antd";

export const ConfigTheme = ({ children }: React.PropsWithChildren) => {
  const [theme] = useTheme(useShallow(state =>[state.theme, state.setTheme]));

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? ThemeAntd.defaultAlgorithm
            : ThemeAntd.darkAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};
