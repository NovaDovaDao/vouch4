import { useState, type ReactNode, useMemo, useCallback } from "react";
import { AuthContext, type AuthState } from "./useAuth";
import type { User } from "@/api/client";
import { AuthService } from "@/services/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authService = new AuthService();
  const [user, setUser] = useState<User | null>(authService.user);
  const [token, setToken] = useState<string | null>(authService.token);

  const setLogin = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    authService.user = user;
    authService.token = token;
  };

  const logout = () => {
    authService.clear();
    setUser(null);
    setToken(null);
  };

  // Helper functions for roles
  const { isMember, isStaff, isSuperAdmin, isTenantOwner } = useMemo(() => {
    const isSuperAdmin = user?.isSuperUser ?? false;
    const isTenantOwner = !!user?.tenancyId;
    const isStaff = user?.category === "STAFF";
    const isMember = user?.category === "MEMBER";
    return {
      isMember,
      isStaff,
      isSuperAdmin,
      isTenantOwner,
    };
  }, [user]);

  const canAccess = useCallback(
    (requiredRoles: User["category"][]): boolean => {
      if (!user) return false;
      if (isSuperAdmin) return true;
      if (requiredRoles.includes("STAFF") && isStaff) return true;
      if (requiredRoles.includes("MEMBER") && isMember) return true;
      return false;
    },
    [isMember, isStaff, isSuperAdmin, user]
  );

  const authState: AuthState = {
    user,
    token,
    setLogin,
    logout,
    isSuperAdmin,
    isTenantOwner,
    isStaff,
    isMember,
    canAccess,
  };

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
