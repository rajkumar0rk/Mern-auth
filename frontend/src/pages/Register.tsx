import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks/useRegister";
import { Link } from "react-router";

const Register = () => {
  const { handleSubmit, error, isError, errors, register } = useRegister();

  // console.log(error);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} noValidate>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                    autoComplete="username"
                    required
                  />
                  <FieldError>
                    {errors.email && errors.email.message}
                  </FieldError>
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    autoComplete="new-password"
                    required
                  />
                  <FieldError>{errors && errors.password?.message}</FieldError>
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Confirm password</FieldLabel>
                  </div>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    autoComplete="new-password"
                    required
                  />
                  <FieldError>
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </FieldError>
                </Field>
                <Field>
                  {isError && (
                    <FieldError className="text-center">
                      {error?.message}
                    </FieldError>
                  )}
                  <Button type="submit">Sign up</Button>
                  <FieldDescription className="text-center">
                    Already have an account? <Link to={"/login"}>Login</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
