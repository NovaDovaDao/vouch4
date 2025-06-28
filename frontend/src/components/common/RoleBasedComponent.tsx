import React, { type ReactNode } from "react";
import { useAuth } from "../../contexts/useAuth";

interface RoleBasedComponentProps {
  allowedRoles?: Array<"SUPER_ADMIN" | "TENANT_OWNER" | "STAFF" | "MEMBER">;
  children: ReactNode;
}

const RoleBasedComponent: React.FC<RoleBasedComponentProps> = ({
  allowedRoles = [],
  children,
}) => {
  const { canAccess } = useAuth();

  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }

  if (canAccess(allowedRoles)) {
    return <>{children}</>;
  }

  return null;
};

export default RoleBasedComponent;
