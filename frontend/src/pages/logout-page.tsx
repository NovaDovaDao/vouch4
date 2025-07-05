import { Navigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "@/contexts/use-auth";

const LogoutPage: React.FC = () => {
  const auth = useAuth();

  if (auth.user) {
    auth.logout();
    toast("Logging out...");
  }

  return <Navigate to="/" />;
};

export default LogoutPage;
