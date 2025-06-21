// frontend/src/App.tsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "./store/authStore.ts";
import LoginPage from "./pages/LoginPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx"; // Your dashboard page
import { Toaster } from "./components/ui/sonner.tsx"; // Shadcn Toaster

const queryClient = new QueryClient();

// PrivateRoute component to protect routes
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth(); // Initialize auth state from local storage on app load
  }, [initializeAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          {/* Default route redirects to login or dashboard based on auth state */}
          <Route
            path="/"
            element={
              <Navigate
                to={
                  useAuthStore.getState().isLoggedIn ? "/dashboard" : "/login"
                }
                replace
              />
            }
          />
          {/* Add more private routes here later */}
          {/* <Route path="/members" element={<PrivateRoute><MembersPage /></PrivateRoute>} /> */}
        </Routes>
      </Router>
      <Toaster /> {/* Shadcn Toaster component */}
    </QueryClientProvider>
  );
}

export default App;
