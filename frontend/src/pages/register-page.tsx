import { Link, Navigate } from "react-router-dom";
import { RegisterForm } from "@/features/auth/register-form";
import { useAuth } from "@/features/auth/use-auth.ts";

export default function RegisterPage() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <RegisterForm />
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </>
  );
}
