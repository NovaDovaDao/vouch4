import { useEffect } from "react";
import {
  IconBuildingStore,
  IconTicket,
  IconDashboard,
  IconDatabase,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconUsers,
  IconBuilding,
  IconCalendar,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useDialogStore } from "@/stores/dialog-store";
import Logo from "./ui/logo";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dialogStore = useDialogStore();
  const location = useLocation();
  const { setOpenMobile } = useSidebar();

  useEffect(() => {
    setOpenMobile(false);
  }, [location, setOpenMobile]);

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        icon: IconDashboard,
      },
      {
        title: "Members",
        url: "/members",
        icon: IconUsers,
      },
      {
        title: "Staff",
        url: "/staff",
        icon: IconUsers,
      },
      {
        title: "Bookings",
        url: "/bookings",
        icon: IconCalendar,
      },
      {
        title: "Classes",
        url: "/classes",
        icon: IconListDetails,
      },
      {
        title: "Products",
        url: "/products",
        icon: IconBuildingStore,
      },
      {
        title: "Gyms",
        url: "/gyms",
        icon: IconBuilding,
      },
    ],
    navReports: [
      {
        name: "Contracts",
        url: "/reports/contracts",
        icon: IconDatabase,
      },
      {
        name: "Entitlements",
        url: "/entitlements",
        icon: IconTicket,
      },
      {
        name: "Sales",
        url: "/reports/sales",
        icon: IconReport,
      },
    ],
    navSecondary: [
      {
        title: "Get Help",
        icon: IconHelp,
        onClick: () => dialogStore.openDialog({ type: "help" }),
      },
      {
        title: "Search",
        icon: IconSearch,
        onClick: () => dialogStore.openDialog({ type: "search" }),
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <Logo className="size-4" />
                <span className="text-base font-semibold">Alé</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments title="Reports" items={data.navReports} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
