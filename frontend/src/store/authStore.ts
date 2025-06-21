import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: { username: string; role: string } | null;
  isLoggedIn: boolean;
  setLogin: (token: string, user: { username: string; role: string }) => void;
  setLogout: () => void;
  initializeAuth: () => void; // For checking local storage on app load
}

export const useAuthStore = create<AuthState>((set) => ({
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

  initializeAuth: () => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");
    if (token && user) {
      try {
        set({ token, user: JSON.parse(user), isLoggedIn: true });
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem("authToken"); // Clear potentially corrupted data
        localStorage.removeItem("authUser");
        set({ token: null, user: null, isLoggedIn: false });
      }
    }
  },
}));
