import { getUser } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
export const Auth = "auth";

interface User {
  email: string;
  createdAt: string;
  verified: boolean;
}

const useAuth = (opt = {}) => {
  const { data, ...rest } = useQuery<{ user: User }>({
    queryKey: [Auth],
    queryFn: getUser,
    staleTime: Infinity,
    ...opt,
  });

  return {
    user: data?.user,
    ...rest,
  };
};

export default useAuth;
