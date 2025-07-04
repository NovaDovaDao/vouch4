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
import MembersPage from "./pages/MembersPage.tsx";
import LogoutPage from "./pages/LogoutPage.tsx";
import ClassesPage from "./pages/ClassesPage.tsx";
import StaffPage from "./pages/StaffPage.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import AccountBillingPage from "./pages/AccountBillingPage.tsx";
import AccountNotificationsPage from "./pages/AccountNotificationsPage.tsx";

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
                <Route path="/members" element={<MembersPage />} />
                <Route path="/staff" element={<StaffPage />} />
                <Route path="/classes" element={<ClassesPage />} />

                <Route path="/reports/contracts" element={<MembersPage />} />
                <Route path="/reports/memberships" element={<MembersPage />} />

                <Route path="/account" element={<AccountPage />} />
                <Route
                  path="/account/billing"
                  element={<AccountBillingPage />}
                />
                <Route
                  path="/account/notifications"
                  element={<AccountNotificationsPage />}
                />
              </Route>
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
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
