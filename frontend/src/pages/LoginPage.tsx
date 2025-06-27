// frontend/src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore.ts"; // Adjust path as needed
import { toast } from "sonner";

// Shadcn UI components (ensure these are imported/available in your project)
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api"; // Make sure this matches your backend URL

type MutationInput = { email: string; password: string };
type MutationResponse = {
  user: {
    id: string;
    email: string;
    isSuperUser: boolean;
    tenancyId?: string;
  };
  accessToken: string;
};

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.setLogin);

  const loginMutation = useMutation<MutationResponse, Error, MutationInput>({
    mutationFn: async (credentials) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      // Assuming backend returns { username, role, accessToken }
      setLogin(data.accessToken, data.user);
      toast.success("Login Successful!", {
        description: `Welcome, ${data.user.email}`,
      });
      navigate("/dashboard"); // Redirect to dashboard after successful login
    },
    onError: (error) => {
      toast.error("Login Error", {
        description: error.message || "An unexpected error occurred.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
            {loginMutation.isError && (
              <p className="text-red-500 text-sm text-center mt-2">
                {loginMutation.error?.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
