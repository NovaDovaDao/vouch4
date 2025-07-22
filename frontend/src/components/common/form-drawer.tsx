import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  type ComponentProps,
  type PropsWithChildren,
  type ReactNode,
} from "react";

type Props = {
  title: string;
  trigger?: ReactNode;
  description?: string;
  drawerProps?: ComponentProps<typeof Drawer>;
};
export default function FormDrawer(props: PropsWithChildren<Props>) {
  const isMobile = useIsMobile();

  return (
    <Drawer {...props.drawerProps} direction={isMobile ? "bottom" : "right"}>
      {props.trigger && <DrawerTrigger asChild>{props.trigger}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{props.title}</DrawerTitle>
          {props.description && (
            <DrawerDescription>{props.description}</DrawerDescription>
          )}
        </DrawerHeader>
        {props.children}
      </DrawerContent>
    </Drawer>
  );
}
