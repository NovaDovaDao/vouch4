// frontend/src/pages/DashboardPage.tsx
import React from "react";
import { useAuthStore } from "../store/authStore.ts";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";

const DashboardPage: React.FC = () => {
  const { user, setLogout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.username}!</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <p className="text-lg">
        This is your admin dashboard. More content coming soon!
      </p>
      {/* Placeholder for future admin components */}
    </div>
  );
};

export default DashboardPage;
