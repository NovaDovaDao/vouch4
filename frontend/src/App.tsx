import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
// import ProtectedRoute from "./components/common/ProtectedRoute";
// import DashboardLayout from "./layouts/DashboardLayout";
// import NotFoundPage from "./pages/NotFoundPage"; // This will also be NotFoundPage.tsx

import LoginPage from "./pages/LoginPage.tsx";
// import DashboardPage from "./pages/DashboardPage.tsx";
// import MembersPage from "./pages/MembersPage.tsx";
// import NewMemberPage from "./pages/NewMemberPage.tsx";
// import AdminLayout from "./components/layout/AdminLayout.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
// import MemberDetailPage from "./pages/MemberDetailPage.tsx";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/set-password" element={<SetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
            <Route path="/" element={<LoginPage />} />

            {/* Nested Routes within AdminLayout */}
            <Route path="/">
              <Route index element={<Navigate to="/dashboard" replace />} />
              {/* Default child route */}
              <Route path="dashboard" element={<DashboardPage />} />
              {/* <Route path="members" element={<MembersPage />} />
            <Route path="members/new" element={<NewMemberPage />} />
            <Route path="members/:id" element={<MemberDetailPage />} /> */}
            </Route>

            {/* Fallback for unauthenticated or non-matching routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
      <Toaster /> {/* Shadcn Toaster component */}
    </>
  );
}

export default App;
