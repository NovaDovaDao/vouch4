import { Link, Navigate } from "react-router-dom";
import { LoginForm } from "@/features/auth/login-form.tsx";
import { useAuth } from "@/features/auth/use-auth.ts";

export default function LoginPage() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <LoginForm />
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </>
  );
}
