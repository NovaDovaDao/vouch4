import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
import { useAuth } from "@/features/auth/use-auth.ts";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { init, user } = useAuth();

  const {
    mutate: login,
    isPending: loading,
    isError,
    error,
  } = $api.useMutation("post", "/auth/login", {
    onSuccess: (message) => {
      if (message) {
        init();
        toast.success("Success", {
          description: message,
        });
        navigate("/dashboard"); // Redirect to dashboard after successful login
      }
    },
    onError: (err) => {
      toast.error(err.error ?? "Login Error", {
        description: handleApiErrorMessage(err),
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ body: { email, password } });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username (Email)</Label>
              <Input
                id="username"
                type="email" // Use type email if your username is email
                placeholder="admin@climbinggym.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            {isError && (
              <p className="text-red-500 text-sm text-center mt-2">
                {String(error.message)}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
