import React, { useEffect, useState } from "react";
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
import { $api, handleApiErrorMessage } from "@/api/client.ts";
import { useAuth } from "@/contexts/useAuth.ts";

export default function SetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { user, logout } = useAuth();

  const setPasswordMutation = $api.useMutation("post", "/auth/set-password", {
    onSuccess: (data) => {
      if (data) {
        toast.success("Setting Password Successful!", {
          description: data.message,
        });
        navigate("/login");
      }
    },
    onError: (err) => {
      toast.error(err.error ?? "Error", {
        description: handleApiErrorMessage(err),
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = searchParams.get("token")!;
    setPasswordMutation.mutate({ body: { newPassword, token } });
  };

  useEffect(() => {
    if (user) logout();
  }, [user, logout]);

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
            <Button
              type="submit"
              className="w-full"
              disabled={setPasswordMutation.isPending}
            >
              {setPasswordMutation.isPending
                ? "Setting Password..."
                : "Set Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
