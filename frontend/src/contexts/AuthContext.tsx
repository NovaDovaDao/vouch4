import {
  useState,
  useEffect,
  type ReactNode,
  useMemo,
  useCallback,
} from "react";
import { AuthContext, type AuthState } from "./useAuth";
import type { User } from "@/api/client";

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

  const setLogin = (user: User, token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
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
      console.log({ requiredRoles });
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

const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  const storedUser = localStorage.getItem(USER_KEY);
  if (storedUser) {
    try {
      // Return immediately if user data is in local storage and is valid
      const user = JSON.parse(storedUser) as User;
      // You might add a lightweight token validation here (e.g., check expiry if token is JWT)
      return user;
    } catch (e) {
      console.error("Failed to parse stored user data:", e);
      localStorage.removeItem(USER_KEY); // Clear corrupt data
    }
  }

  // If no user data or invalid, attempt to fetch profile using the token
  try {
    return null;
    // This assumes you have a /auth/profile or /users/me endpoint
    // and that openapi-fetch will automatically add the Authorization header
    // from a configured `auth` method if you set it up.
    // For simplicity here, we're assuming the token grants access to a profile endpoint.
    // const { data, error, response } = await apiClient.GET("/auth/profile", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // if (response.ok && data) {
    //   const user = data as User; // Cast to your local User type
    //   localStorage.setItem(USER_KEY, JSON.stringify(user)); // Update stored user data
    //   return user;
    // } else {
    //   console.error("Failed to fetch user profile:", error);
    //   localStorage.removeItem(TOKEN_KEY); // Clear invalid token
    //   localStorage.removeItem(USER_KEY);
    //   return null;
    // }
  } catch (err) {
    console.error("Get current user API call failed:", err);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return null;
  }
};
