import { setNavigator } from "@/lib/navigatios";
import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";

const NavigationProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return <>{children}</>;
};

export default NavigationProvider;
