import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { $api, type CreateMember } from "@/api/client";
import FormDrawer from "@/components/common/form-drawer";
import MemberForm from "./member-form";
import { memberSchema } from "./member.schema";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { useState } from "react";

export default function CreateMemberForm() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      email: "",
      firstName: "",
      isActive: true,
      lastName: "",
      phoneNumber: "",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = $api.useMutation("post", "/members");

  const handleSubmit = (body: CreateMember) =>
    mutate(
      { body },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["get", "/members"] });
          toast.success("Success!", {
            description: `Added ${data.firstName}!`,
          });
          setIsOpen(false);
        },
      }
    );

  return (
    <FormDrawer
      title="Add Member"
      description="Enter member information to create a new member"
      trigger={
        <Button variant="outline" size="sm">
          <IconPlus />
          <span className="hidden lg:inline">Add Member</span>
        </Button>
      }
      drawerProps={{ open: isOpen, onOpenChange: setIsOpen }}
    >
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <MemberForm
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
