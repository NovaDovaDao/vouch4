import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import {
  cloneElement,
  isValidElement,
  useRef,
  type ComponentProps,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import type { FormRef } from "@/features/members/member-form";

type Props = {
  title: string;
  trigger?: ReactNode;
  description?: string;
  onSubmit?: () => void;
  drawerProps?: ComponentProps<typeof Drawer>;
};
export default function FormDrawer(props: PropsWithChildren<Props>) {
  const isMobile = useIsMobile();
  const formRef = useRef<FormRef>(null);
  const handleDrawerSubmit = () => {
    formRef.current?.submitForm();
  };

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
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {isValidElement(props.children)
            ? cloneElement(props.children, { ref: formRef } as never)
            : props.children}
        </div>
        <DrawerFooter>
          <Button onClick={handleDrawerSubmit}>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
