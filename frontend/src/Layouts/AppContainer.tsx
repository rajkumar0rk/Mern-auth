import useThemeStore from "@/store/theme";
import React from "react";
import { Outlet } from "react-router";

const AppContainer = () => {
  const { theme, changeTheme } = useThemeStore();
  return (
    <div>
      <h1>AppContainer</h1>
      <Outlet />
    </div>
  );
};

export default AppContainer;
