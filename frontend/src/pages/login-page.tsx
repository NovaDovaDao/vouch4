import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm } from "@/features/auth/login-form.tsx";

import { loginSchema } from "@/features/auth/login.schema";
import { useAuth } from "@/features/auth/use-auth.ts";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth.ts";
import Logo from "@/components/ui/logo";

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { init, user } = useAuth();
  const {
    mutateAsync: login,
    isPending: isSubmitting,
    error,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (variables: { email: string; password: string }) => {
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

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <Logo className="size-6" />
            Alé
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs space-y-6">
            <LoginForm
              form={form}
              isSubmitting={isSubmitting}
              onSubmit={login}
              error={error}
            />
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/pexels-david-waschbusch-959602-1887836.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2]"
        />
      </div>
    </div>
  );
}
