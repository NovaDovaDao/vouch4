import { useState, useEffect, type ReactNode } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../services/auth";
import { User, AuthState } from "../types"; // Import your types
import { AuthContext } from "./useAuth";

const TOKEN_KEY = "jwt_token";
const USER_KEY = "user_data";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user from localStorage on first load
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAndSetUser = async () => {
      // If a token exists but user data is missing or potentially stale, re-fetch
      if (token && !user) {
        setLoading(true);
        try {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            // Re-set user data in local storage if it was null or invalid
            localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
          } else {
            // Token was invalid or expired, clear it
            setToken(null);
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
          }
        } catch (error) {
          console.error("Failed to fetch current user during startup:", error);
          setToken(null);
          setUser(null);
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // No token, or user already loaded
      }
    };
    fetchAndSetUser();
  }, [token, user]); // Re-run if token or user state changes (e.g., after login/logout)

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      if (response.success && response.user && response.token) {
        setUser(response.user);
        setToken(response.token);
        // localStorage storing is handled within loginUser, but redundant setting here is fine
        return { success: true };
      } else {
        return { success: false, message: response.message || "Login failed." };
      }
    } catch (error) {
      return {
        success: false,
        message:
          (error as Error).message ||
          "An unexpected error occurred during login.",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutUser(); // Clears localStorage
    setUser(null);
    setToken(null);
  };

  // Helper functions for roles
  const isSuperAdmin = user?.category === "SUPER_ADMIN"; // Or user?.isSuperUser === true; depending on your DTO
  const isTenantOwner = user?.isTenantOwner === true;
  const isStaff = user?.category === "STAFF";
  const isMember = user?.category === "MEMBER";

  const canAccess = (
    requiredRoles: Array<"SUPER_ADMIN" | "TENANT_OWNER" | "STAFF" | "MEMBER">
  ): boolean => {
    if (!user) return false;
    if (requiredRoles.includes("SUPER_ADMIN") && isSuperAdmin) return true;
    if (requiredRoles.includes("TENANT_OWNER") && isTenantOwner) return true;
    if (requiredRoles.includes("STAFF") && isStaff) return true;
    if (requiredRoles.includes("MEMBER") && isMember) return true;
    return false;
  };

  const authState: AuthState = {
    user,
    token,
    loading,
    login,
    logout,
    isSuperAdmin,
    isTenantOwner,
    isStaff,
    isMember,
    canAccess,
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Loading application...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
