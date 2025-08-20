import { IconCirclePlusFilled } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenuButton } from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDialogStore, type DialogPayload } from "@/stores/dialog-store";

type Option = {
  label: string;
  shortcut?: string;
} & Pick<Exclude<DialogPayload, { type: null }>, "type">;

const options: Option[] = [
  {
    label: "Staff",
    shortcut: "s",
    type: "createStaff",
  },
  {
    label: "Class",
    shortcut: "c",
    type: "createClass",
  },
  {
    label: "Gym",
    shortcut: "g",
    type: "createGym",
  },
];

export default function NavQuickCreate() {
  const isMobile = useIsMobile();
  const dialogStore = useDialogStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          tooltip="Quick Create"
          className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
        >
          <IconCirclePlusFilled />
          <span>Quick Create</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="start"
        side={isMobile ? "bottom" : "right"}
        sideOffset={4}
      >
        {options.map((opt, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => dialogStore.openDialog({ type: opt.type })}
            className="gap-2 p-2"
          >
            {opt.label}
            <DropdownMenuShortcut>⌘{opt.shortcut}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
