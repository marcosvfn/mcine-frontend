"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <span className="flex items-center justify-center">
      <SunIcon size={15} className="mr-2 dark:text-muted-foreground" />
      <Switch
        onCheckedChange={(value) =>
          value ? setTheme("dark") : setTheme("light")
        }
        checked={theme === "dark"}
      />
      <MoonIcon size={15} className="ml-2 dark:text-muted-foreground" />
    </span>
  );
}
