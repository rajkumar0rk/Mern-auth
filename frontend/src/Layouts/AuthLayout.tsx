import useAuth from "@/hooks/useAuth";
import { Outlet, Navigate } from "react-router";
import NavBar from "@/components/NavBar";
import { Spinner } from "@/components/ui/spinner";

const AuthLayout = () => {
  const { user, isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-svh gap-6">
          <Spinner className="size-25 text-slate-500" />
        </div>
      ) : user ? (
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <Outlet />
        </div>
      ) : (
        <>
          <Navigate to={"/login"} />
        </>
      )}
    </>
  );
};

export default AuthLayout;
