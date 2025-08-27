import { Navigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "@/features/auth/use-auth";
import AppLoading from "@/components/app-loading";

function LoggingOut() {
  const auth = useAuth();

  auth.logout();
  toast("Logging out...");

  return <AppLoading />;
}

export default function LogoutPage() {
  const auth = useAuth();

  return auth.user ? <LoggingOut /> : <Navigate to="/login" />;
}
