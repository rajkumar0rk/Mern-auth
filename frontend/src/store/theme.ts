import { create } from "zustand";
import { persist } from "zustand/middleware";

export const themeKey = "theme-mode";

type Theme = "system" | "dark" | "light";

interface ThemeStore {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "system",
      changeTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    },
  ),
);

export default useThemeStore;
