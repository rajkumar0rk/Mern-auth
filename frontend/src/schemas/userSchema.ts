import * as z from "zod";

const emailSchema = z.email().min(1).max(255);
const passwordSchema = z
  .string()
  .min(6, { error: "p assword must have 6 characters" })
  .max(255);
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password must be same",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof registerSchema>;
