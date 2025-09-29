import { authClient } from "@/lib/auth-client";
import { use, createContext, type PropsWithChildren } from "react";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
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
        signIn: (email: string, password: string) =>
          authClient.signIn.email({
            email,
            password,
          }),
        signOut: authClient.signOut,
        session: data?.session.token,
        loading: isPending,
      }}
    >
      {children}
    </AuthContext>
  );
}
