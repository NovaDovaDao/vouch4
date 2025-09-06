import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BreadcrumbsProvider } from "@/features/breadcrumbs/breadcrumbs-context";
import AppDialogs from "@/components/app-dialogs";

export default function AppLayout() {
  return (
    <BreadcrumbsProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6 overflow-auto">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
        <AppDialogs />
      </SidebarProvider>
    </BreadcrumbsProvider>
  );
}
