import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/use-auth";
import type { BetterAuthUser } from "@/lib/auth";
import AppLoading from "../app-loading";

interface ProtectedRouteProps {
  requiredRoles?: BetterAuthUser["category"][];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRoles = [],
}) => {
  const { canAccess, isLoading, user } = useAuth();

  if (isLoading) {
    return <AppLoading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // if (location.pathname !== "/account") {
  //   return <Navigate to="/account" replace />;
  // }

  if (requiredRoles.length > 0 && !canAccess(requiredRoles)) {
    return (
      <div>
        <h2>Unauthorized Access</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
