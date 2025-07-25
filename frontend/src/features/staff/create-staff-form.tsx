import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IconPlus } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { $api, type CreateStaff } from "@/api/client";
import FormDrawer from "@/components/common/form-drawer";
import StaffForm from "./staff-form";
import { staffSchema } from "./staff.schema";
import { Button } from "@/components/ui/button";
import { DrawerFooter, DrawerClose } from "@/components/ui/drawer";

export default function CreateStaffForm() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      email: "",
      firstName: "",
      isActive: true,
      lastName: "",
      phoneNumber: "",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = $api.useMutation("post", "/staff");

  const handleSubmit = (body: CreateStaff) =>
    mutate(
      { body },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["get", "/staff"] });
          toast.success("Success!", {
            description: `Added ${data.firstName}!`,
          });
          setIsOpen(false);
        },
      }
    );

  return (
    <FormDrawer
      title="Add Staff"
      description="Enter staff information"
      trigger={
        <Button variant="outline" size="sm">
          <IconPlus />
          <span className="hidden lg:inline">Add Staff</span>
        </Button>
      }
      drawerProps={{ open: isOpen, onOpenChange: setIsOpen }}
    >
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <StaffForm
          form={form}
          isSubmitting={isPending}
          onSubmit={handleSubmit}
        />
      </div>
      <DrawerFooter>
        <Button onClick={() => handleSubmit(form.getValues())}>Submit</Button>
        <DrawerClose asChild>
          <Button variant="outline">Done</Button>
        </DrawerClose>
      </DrawerFooter>
    </FormDrawer>
  );
}
