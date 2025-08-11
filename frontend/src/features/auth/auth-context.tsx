import { useCallback, type PropsWithChildren } from "react";
import { AuthContext, type AuthState } from "./use-auth";
import { authClient } from "@/lib/auth";
import type { User } from "@/graphql/graphql";
import { useQuery } from "@tanstack/react-query";

export const AuthProvider = (props: PropsWithChildren) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-session"],
    queryFn: () => authClient.getSession(),
  });

  const canAccess = useCallback(
    (requiredRoles: User["category"][]): boolean => {
      if (!data?.data?.user) return false;
      return requiredRoles.includes(
        (data.data.user as unknown as User).category
      );
    },
    [data]
  );

  const authState = {
    user: undefined,
    init: refetch,
    isLoading,
    logout: async () => {},
    canAccess,
  } satisfies AuthState;

  return (
    <AuthContext.Provider value={authState}>
      {props.children}
    </AuthContext.Provider>
  );
};
