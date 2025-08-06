import { useCallback, type PropsWithChildren } from "react";
import { AuthContext, type AuthState } from "./use-auth";
import { $api, type User } from "@/api/client";
import { useQueryClient } from "@tanstack/react-query";

export const AuthProvider = (props: PropsWithChildren) => {
  const {
    data: user,
    refetch,
    isLoading,
  } = $api.useQuery("get", "/auth/me", {}, { retry: false });

  const queryClient = useQueryClient();
  const { mutate: logout } = $api.useMutation("post", "/auth/logout", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get", "/auth/me"] });
    },
  });

  const canAccess = useCallback(
    (requiredRoles: User["role"][]): boolean => {
      if (!user) return false;
      return requiredRoles.includes(user.role);
    },
    [user]
  );

  const authState = {
    user,
    init: refetch,
    isLoading,
    logout: async () => logout({}),
    canAccess,
  } satisfies AuthState;

  return (
    <AuthContext.Provider value={authState}>
      {props.children}
    </AuthContext.Provider>
  );
};
