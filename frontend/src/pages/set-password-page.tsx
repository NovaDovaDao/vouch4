import { SetPasswordForm } from "@/features/auth/set-password-form";
import { useParams } from "react-router-dom";

export default function SetPasswordPage() {
  const { token } = useParams<{ token: string }>();

  if (!token) {
    return <div>Error: No token provided</div>;
  }

  return <SetPasswordForm token={token} />;
}
