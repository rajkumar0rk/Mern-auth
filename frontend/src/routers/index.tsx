import AppContainer from "@/Layouts/AppContainer";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import Settings from "@/pages/Settings";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppContainer,
    children: [
      {
        index: true,
        Component: Profile,
      },
      {
        path: "settings",
        Component: Settings,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);

export default router;
