import type { User } from "@/api/client";
import { createContext, useContext } from "react";

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<
    | {
        success: boolean;
        message?: undefined;
      }
    | {
        success: boolean;
        message: string;
      }
  >;
  logout: () => void;
  isSuperAdmin: boolean;
  isTenantOwner: boolean;
  isStaff: boolean;
  isMember: boolean;
  canAccess: (
    requiredRoles: Array<"SUPER_ADMIN" | "TENANT_OWNER" | "STAFF" | "MEMBER">
  ) => boolean;
}

export const AuthContext = createContext<AuthState | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
