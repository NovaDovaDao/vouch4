import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/sonner.tsx";
import ProtectedRoute from "./components/common/ProtectedRoute.tsx";

import LoginPage from "./pages/LoginPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AppLayout from "./layouts/AppLayout.tsx";
import SetPasswordPage from "./pages/SetPasswordPage.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<ProtectedRoute requiredRoles={["STAFF"]} />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<DashboardPage />} />
              </Route>
            </Route>

            <Route
              element={<ProtectedRoute requiredRoles={["STAFF", "MEMBER"]} />}
            >
              <Route element={<AppLayout />}>
                <Route path="/" element={<DashboardPage />} />
              </Route>
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/set-password" element={<SetPasswordPage />} />
            <Route path="/not-found" element={<NotFoundPage />} />

            {/* Fallback for unauthenticated or non-matching routes */}
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </Router>
        <Toaster /> {/* Shadcn Toaster component */}
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
