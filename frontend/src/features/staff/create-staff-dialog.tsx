import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { $api, type CreateStaff } from "@/api/client";
import StaffForm from "./staff-form";
import { staffSchema } from "./staff.schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CreateStaffDialog({
  handleOpen,
}: {
  handleOpen: (open: boolean) => void;
}) {
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
          handleOpen(false);
        },
      }
    );

  return (
    <Dialog open onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Staff</DialogTitle>
          <DialogDescription>Enter staff information</DialogDescription>
        </DialogHeader>
        <StaffForm
          form={form}
          isSubmitting={isPending}
          onSubmit={handleSubmit}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => handleSubmit(form.getValues())}>
            Save class
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
