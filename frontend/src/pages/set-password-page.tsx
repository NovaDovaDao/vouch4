import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "../components/ui/input.tsx";
import { Button } from "../components/ui/button.tsx";
import { authClient } from "@/lib/auth.ts";
import { useMutation } from "@tanstack/react-query";

export default function SetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { mutate: setPassword, isPending } = useMutation({
    mutationKey: ["set-password"],
    mutationFn: (variables: { token: string; newPassword: string }) =>
      authClient.resetPassword(variables),
    onSuccess: (data) => {
      toast.success("Set Password", {
        description: data.data?.status,
      });
      navigate("/login");
    },
    onError: (err) => {
      toast.error("Error", {
        description: err.message,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = searchParams.get("token")!;
    setPassword({ token, newPassword });
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Set Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your new password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Setting Password..." : "Set Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
