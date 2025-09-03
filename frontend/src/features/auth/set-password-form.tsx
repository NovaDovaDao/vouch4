import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setPasswordSchema, SetPasswordFormData } from "./set-password.schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import PasswordInput from "@/components/ui/password-input";

const setPasswordMutation = graphql(/* GraphQL */ `
  mutation SetInitialPassword($token: String!, $password: String!) {
    setInitialPassword(token: $token, password: $password) {
      id
    }
  }
`);

interface SetPasswordFormProps {
  token: string;
}

export function SetPasswordForm({ token }: SetPasswordFormProps) {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: SetPasswordFormData) =>
      execute(setPasswordMutation, { token, password: data.password }),
    onSuccess: () => {
      navigate("/login");
    },
  });

  const form = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { register, handleSubmit, formState } = form;

  return (
    <form
      className={cn("flex flex-col gap-6")}
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Set your password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter a new password for your account.
        </p>
      </div>
      {error && (
        <div className="text-red-500 text-sm text-center">{error.message}</div>
      )}
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            required
            autoFocus
            {...register("password")}
          />
          {formState.errors.password && (
            <p className="text-red-500 text-sm">
              {formState.errors.password.message}
            </p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <PasswordInput
            id="confirmPassword"
            required
            {...register("confirmPassword")}
          />
          {formState.errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Setting password..." : "Set Password"}
        </Button>
      </div>
    </form>
  );
}
