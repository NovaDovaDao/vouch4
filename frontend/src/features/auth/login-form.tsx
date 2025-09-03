import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "./login.schema";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth";
import { useAuth } from "./use-auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IconAlertTriangle } from "@tabler/icons-react";
import PasswordInput from "@/components/ui/password-input";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { init } = useAuth();
  const {
    mutate: login,
    isPending: isSubmitting,
    error,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (variables: LoginFormData) => {
      const response = await authClient.signIn.email(variables);
      if (response.error || !response.data?.user) {
        throw new Error(
          response.error?.message ||
            "Login failed. Please check your credentials.",
        );
      }
      return response;
    },
    onSuccess: async (data) => {
      if (data.data?.user) {
        await init();
        toast.success("Success", {
          description: "Welcome back! " + data.data.user.name,
        });
        navigate("/dashboard"); // Redirect to dashboard after successful login
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      className={cn("flex flex-col gap-6")}
      onSubmit={handleSubmit((data) => login(data))}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      {error && (
        <Alert variant="destructive">
          <IconAlertTriangle />
          <AlertTitle>Login Failed</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="magnus@midtbo.io"
            required
            autoFocus
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <PasswordInput id="password" required {...register("password")} />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in" : "Login"}
        </Button>
      </div>
    </form>
  );
}
