import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

interface ProtectedRouteProps {
  requiredRoles?: Array<"SUPER_ADMIN" | "TENANT_OWNER" | "STAFF" | "MEMBER">;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRoles = [],
}) => {
  const { user, loading, canAccess } = useAuth();

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Loading content...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles.length > 0 && !canAccess(requiredRoles)) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        <h2>Unauthorized Access</h2>
        <p>You do not have permission to view this page.</p>
        <Navigate to="/login" replace />{" "}
        {/* Or navigate to dashboard based on role */}
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
