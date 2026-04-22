import NavigationProvider from "@/providers/NavigationProvider";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <NavigationProvider>
      <Outlet />
    </NavigationProvider>
  );
};

export default AppLayout;
