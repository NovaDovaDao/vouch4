import { Navigate, useNavigate } from "react-router-dom";
import { IconGymnastics } from "@tabler/icons-react";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm } from "@/features/auth/login-form.tsx";

import { loginSchema } from "@/features/auth/login.schema";
import { useAuth } from "@/features/auth/use-auth.ts";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth.ts";

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
  const { mutateAsync: login, isPending: isSubmitting } = useMutation({
    mutationKey: ["login"],
    mutationFn: (variables: { email: string; password: string }) =>
      authClient.signIn.email(variables),
    onSuccess: async (data) => {
      if (data.data?.user) {
        await init();
        toast.success("Success", {
          description: "Welcome back! " + data.data.user.name,
        });
        navigate("/dashboard"); // Redirect to dashboard after successful login
      }
    },
    onError: (err) => {
      toast.error("Login Error", {
        description: err.message,
      });
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
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <IconGymnastics className="size-4" />
            </div>
            Ascend
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              form={form}
              isSubmitting={isSubmitting}
              onSubmit={login}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/pexels-david-waschbusch-959602-1887836.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
