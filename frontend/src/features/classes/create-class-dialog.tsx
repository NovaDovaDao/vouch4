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
import ClassForm from "./class-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { classSchema } from "./class.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphql } from "@/graphql";
import type {
  ClassCreateInput,
  CreateClassMutationVariables,
} from "@/graphql/graphql";
import { execute } from "@/graphql/execute";

const CREATE_CLASS = graphql(`
  mutation CreateClass($data: ClassCreateInput!) {
    createClass(data: $data) {
      id
      name
    }
  }
`);

export default function CreateClassDialog({
  handleOpen,
}: {
  handleOpen: (open: boolean) => void;
}) {
  const form = useForm({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      description: "",
      capacity: 0,
      gymId: "",
      instructorId: "",
      scheduleDateTime: "",
    },
    shouldFocusError: true,
  });
  const queryClient = useQueryClient();
  const { mutate: createClass, isPending } = useMutation({
    mutationKey: ["create-class"],
    mutationFn: (variables: CreateClassMutationVariables) =>
      execute(CREATE_CLASS, variables),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast.success("Success!", {
        description: `Added ${data.createClass.name}!`,
      });
      handleOpen(false);
    },
  });

  const handleSubmit = (body: ClassCreateInput) =>
    createClass({
      data: body,
    });

  return (
    <Dialog open onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Class</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ClassForm
          form={form}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
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
