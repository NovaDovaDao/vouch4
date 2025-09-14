import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./features/auth/auth-context.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import ProtectedRoute from "./components/common/protected-route.tsx";

import LoginPage from "./pages/login-page.tsx";
import RegisterPage from "./pages/register-page.tsx";
import DashboardPage from "./pages/dashboard-page.tsx";
import NotFoundPage from "./pages/not-found-page.tsx";
import AppLayout from "./layouts/app-layout.tsx";
import SetPasswordPage from "./pages/set-password-page.tsx";
import LogoutPage from "./pages/logout-page.tsx";
import ClassesPage from "./pages/classes-page.tsx";
import StaffPage from "./pages/staff-page.tsx";
import AccountPage from "./pages/account-page.tsx";
import AccountBillingPage from "./pages/account-billing-page.tsx";
import AccountNotificationsPage from "./pages/account-notifications-page.tsx";
import ProductsPage from "./pages/products-page.tsx";
import ReportsContractsPage from "./pages/reports-contracts-page.tsx";
import ReportsMembershipsPage from "./pages/reports-memberships-page.tsx";
import GymsPage from "./pages/gyms-page.tsx";
import MembersPage from "./pages/members-page.tsx";
import BookingsPage from "./pages/bookings-page.tsx";
import { AuthLayout } from "./layouts/auth-layout.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<ProtectedRoute requiredRoles={["STAFF"]} />}>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="staff" element={<StaffPage />} />
                <Route path="members" element={<MembersPage />} />
                <Route path="classes" element={<ClassesPage />} />
                <Route path="bookings" element={<BookingsPage />} />
                <Route path="gyms" element={<GymsPage />} />
                <Route path="products" element={<ProductsPage />} />

                <Route path="reports">
                  <Route path="contracts" element={<ReportsContractsPage />} />
                  <Route
                    path="memberships"
                    element={<ReportsMembershipsPage />}
                  />
                </Route>

                <Route path="account">
                  <Route index element={<AccountPage />} />
                  <Route path="billing" element={<AccountBillingPage />} />
                  <Route
                    path="notifications"
                    element={<AccountNotificationsPage />}
                  />
                </Route>
              </Route>
            </Route>

            {/* Public Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/set-password/:token"
                element={<SetPasswordPage />}
              />
            </Route>
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/not-found" element={<NotFoundPage />} />

            {/* Fallback for unauthenticated or non-matching routes */}
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
