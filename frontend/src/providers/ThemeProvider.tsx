import useThemeStore, { themeKey } from "@/store/theme";
import React, { useEffect, type PropsWithChildren } from "react";

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useThemeStore((s) => s.theme);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      localStorage.setItem(themeKey, theme);
      root.classList.add(theme);
    }
  }, [theme]);
  return <>{children}</>;
};

export default ThemeProvider;
