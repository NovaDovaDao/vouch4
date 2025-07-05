import type { User } from "@/api/client";
import { createContext, useContext } from "react";

export interface AuthState {
  user: User | null;
  token: string | null;
  setLogin: (user: User, token: string) => void;
  logout: () => void;
  isSuperAdmin: boolean;
  isTenantOwner: boolean;
  isStaff: boolean;
  isMember: boolean;
  canAccess: (requiredRoles: User["category"][]) => boolean;
}

export const AuthContext = createContext<AuthState | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
