// frontend/src/components/layout/AdminLayout.tsx
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.ts"; // Corrected import path
import { Button } from "../ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu.tsx";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet.tsx";
import { CircleUser, Menu } from "lucide-react"; // Example icons
import { Input } from "../ui/input.tsx"; // For future search

const AdminLayout: React.FC = () => {
  const { user, setLogout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogout();
    navigate("/login");
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar Navigation */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <span className="text-lg">Ascent Gym Admin</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                Dashboard
              </Link>
              <Link
                to="/members"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                Members
              </Link>
              {/* Add more navigation links here */}
              <Link
                to="#" // Placeholder for future features
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                Check-ins (soon)
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col">
        {/* Top Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  Ascent Gym Admin
                </Link>
                <Link
                  to="/dashboard"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  to="/members"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  Members
                </Link>
                {/* Mobile nav links */}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Search Bar - placeholder */}
            <form>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search members..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Child Routes Render Here */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet /> {/* This is where nested routes will render */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
