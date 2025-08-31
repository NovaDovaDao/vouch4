import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import MemberForm from "./member-form";
import { memberSchema } from "./member.schema";
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
import { graphql } from "@/graphql";
import type {
  CreateMemberMutationVariables,
  MemberCreateInput,
} from "@/graphql/graphql";
import { execute } from "@/graphql/execute";

const CREATE_MEMBER = graphql(`
  mutation CreateMember($data: MemberCreateInput!) {
    createMember(data: $data) {
      id
      firstName
    }
  }
`);

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
  const { mutate, isPending } = useMutation({
    mutationKey: ["members", "create"],
    mutationFn: (variables: CreateMemberMutationVariables) =>
      execute(CREATE_MEMBER, variables),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success("Success!", {
        description: `Added ${data.createMember.firstName}!`,
      });
      handleOpen(false);
    },
  });

  const handleSubmit = (body: MemberCreateInput) => mutate({ data: body });

  return (
    <Dialog open onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>Enter member information</DialogDescription>
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
          <Button onClick={() => handleSubmit(form.getValues())}>
            Save member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
