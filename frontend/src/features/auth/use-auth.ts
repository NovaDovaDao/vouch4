import type { BetterAuthUser } from "@/lib/auth";
import { createContext, useContext } from "react";

export interface AuthState {
  user?: BetterAuthUser;
  isLoading: boolean;
  init: () => Promise<unknown>;
  logout: () => Promise<void>;
  canAccess: (role: BetterAuthUser["category"][]) => boolean;
}

export const AuthContext = createContext<AuthState | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
