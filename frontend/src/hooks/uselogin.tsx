import { login } from "@/lib/api";
import { navigateTo } from "@/lib/navigatios";
import { loginSchema, type LoginType } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const useLogin = () => {
  const {
    mutate: loginUser,
    isError,
    error,
  } = useMutation<{ email: string }, Error, LoginType>({
    mutationFn: login,
    onSuccess: () => {
      navigateTo("/");
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: LoginType) => {
    loginUser(data);
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    errors,
    register,
    isError,
    error,
  };
};
