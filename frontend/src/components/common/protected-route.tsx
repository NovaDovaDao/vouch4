import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/use-auth";
import type { User } from "@/api/client";
import AppLoading from "../app-loading";

interface ProtectedRouteProps {
  requiredRoles?: User["role"][];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRoles = [],
}) => {
  const { user, canAccess, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <AppLoading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.hasTenancy && location.pathname !== "/account") {
    return <Navigate to="/account" replace />;
  }

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
