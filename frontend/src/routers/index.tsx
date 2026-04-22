import ErrorBoundary from "@/components/ErrorBoundary";
import AppLayout from "@/Layouts/AppLayout";
import AuthLayout from "@/Layouts/AuthLayout";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import Settings from "@/pages/Settings";
import { createBrowserRouter, Navigate } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "user",
        Component: AuthLayout,
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
        index: true,
        element: <Navigate to={"/user"} />,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);

export default router;
