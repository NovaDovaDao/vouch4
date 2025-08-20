import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import NavQuickCreate from "./nav-quick-create";
import { useIsMobile } from "@/hooks/use-mobile";

type Item = {
  title: string;
  url: string;
  icon?: Icon;
};

export function NavMain({ items }: { items: Item[] }) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <NavQuickCreate />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item, i) => (
            <Link
              to={item.url}
              key={i}
              onClick={() => (isMobile ? toggleSidebar() : undefined)}
            >
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={location.pathname === item.url}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
