import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/use-auth";
import type { User } from "@/api/client";

interface ProtectedRouteProps {
  requiredRoles?: User["category"][];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRoles = [],
}) => {
  const { user, canAccess } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
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
