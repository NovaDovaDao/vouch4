import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { $api, type CreateMember } from "@/api/client";
import MemberForm from "./member-form";
import { memberSchema } from "./member.schema";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CreateMemberDialog({
  handleOpen,
}: {
  handleOpen: (open: boolean) => void;
}) {
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
          handleOpen(false);
        },
      }
    );

  return (
    <Dialog open onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>
            Enter member information to create a new member
          </DialogDescription>
        </DialogHeader>
        <MemberForm
          form={form}
          isSubmitting={isPending}
          onSubmit={handleSubmit}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onSubmit={() => handleSubmit(form.getValues())}>
            Save class
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
