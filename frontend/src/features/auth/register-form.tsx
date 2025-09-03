import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "./register.schema";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth";
import { useAuth } from "./use-auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PasswordInput from "@/components/ui/password-input";

export function RegisterForm() {
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
  const { init } = useAuth();
  const { mutate: signUp, isPending: isSubmitting } = useMutation({
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      className={cn("flex flex-col gap-6")}
      onSubmit={handleSubmit((data) => signUp(data))}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your deets below to register your account
        </p>
      </div>
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
          </div>
          <PasswordInput id="password" required {...register("password")} />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">First Name</Label>
          </div>
          <Input id="first-name" required {...register("firstName")} />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Last Name</Label>
          </div>
          <Input id="last-name" required {...register("lastName")} />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </div>
    </form>
  );
}
