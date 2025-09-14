import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useBreadcrumbs } from "@/features/breadcrumbs/use-breadcrumbs";
import NavQuickCreate from "./nav-quick-create";

export function SiteHeader() {
  const { breadcrumbs } = useBreadcrumbs();
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex-1">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="text-base font-medium">
              {crumb.label}
            </span>
          ))}
        </div>
        <div>
          <NavQuickCreate />
        </div>
      </div>
    </header>
  );
}
