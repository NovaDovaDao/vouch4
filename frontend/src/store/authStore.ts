import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: { username: string; role: string } | null;
  isLoggedIn: boolean;
  setLogin: (token: string, user: { username: string; role: string }) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>()(
  // <--- Notice the extra `()` after `create<AuthState>()`
  persist(
    // <--- Wrap your store definition with persist
    (set) => ({
      token: null,
      user: null,
      isLoggedIn: false,

      setLogin: (token, user) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(user));
        set({ token, user, isLoggedIn: true });
      },

      setLogout: () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        set({ token: null, user: null, isLoggedIn: false });
      },
    }),
    {
      name: "auth-storage", // unique name for your localStorage key
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        // (optional) specify which parts of the state to store
        token: state.token,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
