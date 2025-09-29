import { authClient } from "@/lib/auth-client";
import { use, createContext, type PropsWithChildren } from "react";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  session?: string | null;
  loading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  loading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export default function SessionProvider({ children }: PropsWithChildren) {
  const { data, isPending } = authClient.useSession();

  return (
    <AuthContext
      value={{
        signIn: async (email: string, password: string) => {
          const response = await authClient.signIn.email({
            email,
            password,
          });
          if (response.error)
            throw new Error("Unable to sign in", { cause: response.error });

          return !!response.data.user;
        },
        signOut: authClient.signOut,
        session: data?.session.token,
        loading: isPending,
      }}
    >
      {children}
    </AuthContext>
  );
}
