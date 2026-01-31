import { registerSchema, type RegisterType } from "@/schemas/userSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "@/lib/api";
import { navigateTo } from "@/lib/navigatios";

interface RegisterResponse {
  email: string;
}

export const useRegister = () => {
  const {
    mutate: createAccount,
    isError,
    error,
  } = useMutation<RegisterResponse, Error, RegisterType>({
    mutationFn: async (data) =>
      await registerApi<RegisterType, RegisterResponse>(data),
    onSuccess: () => {
      navigateTo("/");
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: RegisterType) => {
    createAccount(data);
  };

  return {
    onSubmit,
    handleSubmit: handleSubmit(onSubmit),
    register,
    isError,
    errors,
    error,
  };
};
