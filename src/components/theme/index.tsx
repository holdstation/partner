import { useTheme } from "@/stores/theme";
import { useShallow } from "zustand/react/shallow";

import { ConfigProvider, theme as ThemeAntd } from "antd";
import { useEffect } from "react";

export const ConfigTheme = ({ children }: React.PropsWithChildren) => {
  const [theme] = useTheme(useShallow((state) => [state.theme, state.setTheme]));

  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#FFF";
    } else {
      document.body.style.backgroundColor = "#000";
    }
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === "dark" ? ThemeAntd.defaultAlgorithm : ThemeAntd.darkAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};
