import {
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

type Themes = "dark" | "light" | "system";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (value: Themes) => {
    setTheme(value);
  };

  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel className="font-normal">Theme</DropdownMenuLabel>
      <ToggleGroup type="single" size={"sm"} defaultValue={theme}>
        <ToggleGroupItem
          value="dark"
          aria-label="Toggle dark"
          onClick={() => handleThemeChange("dark")}
        >
          <MoonIcon size={22} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="light"
          aria-label="Toggle light"
          onClick={() => handleThemeChange("light")}
        >
          <SunIcon size={22} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="system"
          aria-label="Toggle system"
          onClick={() => handleThemeChange("system")}
        >
          <MonitorIcon size={22} />
        </ToggleGroupItem>
      </ToggleGroup>
    </DropdownMenuGroup>
  );
};
