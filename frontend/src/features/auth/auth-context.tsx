import { useCallback, type PropsWithChildren } from "react";
import { AuthContext, type AuthState } from "./use-auth";
import { $api, type User } from "@/api/client";
import { useQueryClient } from "@tanstack/react-query";

export const AuthProvider = (props: PropsWithChildren) => {
  const { data: user, refetch } = $api.useQuery(
    "get",
    "/auth/me",
    {},
    { retry: false }
  );
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

  const queryClient = useQueryClient();
  const authState: AuthState = {
    user,
    init: refetch,
    logout: async () => logout({}),
    canAccess,
  };

  return (
    <AuthContext.Provider value={authState}>
      {props.children}
    </AuthContext.Provider>
  );
};
