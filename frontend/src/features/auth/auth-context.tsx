import { useCallback, type PropsWithChildren } from "react";
import { AuthContext, type AuthState } from "./use-auth";
import { authClient, type BetterAuthUser } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";

export const AuthProvider = (props: PropsWithChildren) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-session"],
    queryFn: () => authClient.getSession(),
    select: (data) => data.data,
  });

  const canAccess = useCallback(
    (requiredRoles: BetterAuthUser["category"][]): boolean => {
      if (requiredRoles.length === 0) return true;
      if (!data?.user) return false;
      return requiredRoles.includes(data.user.category);
    },
    [data]
  );

  const logout = async () => {
    await authClient.signOut();
  };

  const authState = {
    user: data?.user,
    init: refetch,
    isLoading,
    logout,
    canAccess,
  } satisfies AuthState;

  return (
    <AuthContext.Provider value={authState}>
      {props.children}
    </AuthContext.Provider>
  );
};
