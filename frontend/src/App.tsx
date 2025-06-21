import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "./store/authStore.ts";
import LoginPage from "./pages/LoginPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import MembersPage from "./pages/MembersPage.tsx";
import NewMemberPage from "./pages/NewMemberPage.tsx";
import AdminLayout from "./components/layout/AdminLayout.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import MemberDetailPage from "./pages/MemberDetailPage.tsx";

const queryClient = new QueryClient();

// PrivateRoute component to protect routes
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Nested Routes within AdminLayout */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AdminLayout />{" "}
                {/* Admin layout wraps dashboard and other admin pages */}
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />{" "}
            {/* Default child route */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="members/new" element={<NewMemberPage />} />
            <Route path="members/:id" element={<MemberDetailPage />} />
          </Route>

          {/* Fallback for unauthenticated or non-matching routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      <Toaster /> {/* Shadcn Toaster component */}
    </QueryClientProvider>
  );
}

export default App;
