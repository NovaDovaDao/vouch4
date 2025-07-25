import React, { type ReactNode } from "react";
import { useAuth } from "../../features/auth/use-auth";

interface RoleBasedComponentProps {
  allowedRoles?: Array<"STAFF" | "MEMBER">;
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
