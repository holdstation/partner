import { useTheme } from "@/stores/theme";
import { Button } from "antd";
import { useShallow } from "zustand/react/shallow";
import { MoonFilledIcon, SunFilledIcon } from "../icons";

export function SwitchTheme() {
  const [theme, setTheme] = useTheme(
    useShallow((state) => [state.theme, state.setTheme])
  );

  return (
    <Button
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
      type="text"
      icon={
        <div>
          {theme == "light" ? (
            <MoonFilledIcon size={22} />
          ) : (
            <SunFilledIcon size={22} />
          )}
        </div>
      }
    />
  );
}
