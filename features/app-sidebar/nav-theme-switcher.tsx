import {
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ComputerIcon,
  Moon02Icon,
  Sun01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
          <HugeiconsIcon strokeWidth={1.5} icon={Moon02Icon} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="light"
          aria-label="Toggle light"
          onClick={() => handleThemeChange("light")}
        >
          <HugeiconsIcon icon={Sun01Icon} strokeWidth={1.5} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="system"
          aria-label="Toggle system"
          onClick={() => handleThemeChange("system")}
        >
          <HugeiconsIcon icon={ComputerIcon} strokeWidth={1.5} />
        </ToggleGroupItem>
      </ToggleGroup>
    </DropdownMenuGroup>
  );
};
