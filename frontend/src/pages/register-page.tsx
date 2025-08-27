import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/features/auth/use-auth.ts";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth.ts";
import Logo from "@/components/ui/logo";

import { RegisterForm } from "@/features/auth/register-form";
import {
  registerSchema,
  RegisterFormData,
} from "@/features/auth/register.schema";

export default function RegisterPage() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const navigate = useNavigate();
  const { init, user } = useAuth();
  const { mutateAsync: signUp, isPending: isSubmitting } = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: (variables: RegisterFormData) =>
      authClient.signUp.email({
        ...variables,
        name: "",
      }),
    onSuccess: async (data) => {
      if (data.data?.user) {
        await init();
        toast.success("Success", {
          description: "Welcome! " + data.data.user.name,
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
            <Logo className="size-6" />
            Alé
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs space-y-6">
            <RegisterForm
              form={form}
              isSubmitting={isSubmitting}
              onSubmit={signUp}
            />
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Login
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
