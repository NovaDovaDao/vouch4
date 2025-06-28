// frontend/src/layouts/DashboardLayout.tsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import RoleBasedComponent from "../components/common/RoleBasedComponent";
import "../styles/main.css";

const DashboardLayout: React.FC = () => {
  const { user, logout, isTenantOwner, isStaff, isMember } = useAuth();

  if (!user) {
    return <p>Please log in to access the dashboard.</p>;
  }

  const getWelcomeMessage = () => {
    let roleName = "User";
    if (isSuperAdmin)
      roleName = "Super Admin"; // Assuming you add super admin routes later
    else if (isTenantOwner) roleName = "Tenant Owner";
    else if (isStaff) roleName = "Staff";
    else if (isMember) roleName = "Member";

    return `Welcome, ${user.firstName || user.email} (${roleName})!`;
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1>Gym Platform</h1>
        <nav className="main-nav">
          {isTenantOwner && (
            <Link to="/tenant/dashboard">Tenant Dashboard</Link>
          )}
          {isStaff && <Link to="/staff/dashboard">Staff Dashboard</Link>}
          {isMember && <Link to="/member/dashboard">Member Dashboard</Link>}
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </nav>
      </header>

      <aside className="dashboard-sidebar">
        <p className="welcome-message">{getWelcomeMessage()}</p>
        <nav className="sidebar-nav">
          <RoleBasedComponent allowedRoles={["TENANT_OWNER"]}>
            <h3>Tenant Owner Menu</h3>
            <ul>
              <li>
                <Link to="/tenant/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/tenant/gyms/list">Manage Gyms</Link>
              </li>
              <li>
                <Link to="/tenant/users/list">Manage Users</Link>
              </li>
              <li>
                <Link to="/tenant/classes/list">Manage Classes</Link>
              </li>
              <li>
                <Link to="/tenant/memberships/nfts/list">
                  Manage Memberships
                </Link>
              </li>
              <li>
                <Link to="/tenant/reports">Reports</Link>
              </li>
              <li>
                <Link to="/tenant/settings">Settings</Link>
              </li>
            </ul>
          </RoleBasedComponent>

          <RoleBasedComponent allowedRoles={["STAFF"]}>
            <h3>Staff Menu</h3>
            <ul>
              <li>
                <Link to="/staff/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/staff/check-in">Check-In Desk</Link>
              </li>
              <li>
                <Link to="/staff/classes/my-classes">My Classes</Link>
              </li>
              <li>
                <Link to="/staff/members/lookup">Member Lookup</Link>
              </li>
              <li>
                <Link to="/staff/profile">My Profile</Link>
              </li>
            </ul>
          </RoleBasedComponent>

          <RoleBasedComponent allowedRoles={["MEMBER"]}>
            <h3>Member Menu</h3>
            <ul>
              <li>
                <Link to="/member/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/member/classes/book">Book Class</Link>
              </li>
              <li>
                <Link to="/member/membership/details">My Membership</Link>
              </li>
              <li>
                <Link to="/member/profile/my-details">My Profile</Link>
              </li>
            </ul>
          </RoleBasedComponent>
        </nav>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
