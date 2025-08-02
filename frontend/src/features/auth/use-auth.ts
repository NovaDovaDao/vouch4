import type { User } from "@/api/client";
import { createContext, useContext } from "react";

export interface AuthState {
  user?: User;
  init: () => void;
  logout: () => Promise<void>;
  canAccess: (role: User["role"][]) => boolean;
}

export const AuthContext = createContext<AuthState | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
