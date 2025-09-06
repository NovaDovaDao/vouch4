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
import ClassTemplateForm from "./class-template-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { classTemplateSchema } from "./class-template.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphql } from "@/graphql";
import type {
  ClassTemplateCreateInput,
  CreateClassTemplateMutationVariables,
} from "@/graphql/graphql";
import { execute } from "@/graphql/execute";

const CREATE_CLASS_TEMPLATE = graphql(`
  mutation CreateClassTemplate($data: ClassTemplateCreateInput!) {
    createClassTemplate(data: $data) {
      id
      name
    }
  }
`);

export default function CreateClassTemplateDialog({
  handleOpen,
}: {
  handleOpen: (open: boolean) => void;
}) {
  const form = useForm({
    resolver: zodResolver(classTemplateSchema),
    defaultValues: {
      name: "",
      description: "",
      capacity: 0,
      gymId: "",
      instructorId: "",
    },
    shouldFocusError: true,
  });
  const queryClient = useQueryClient();
  const { mutate: createClass, isPending } = useMutation({
    mutationKey: ["create-class"],
    mutationFn: (variables: CreateClassTemplateMutationVariables) =>
      execute(CREATE_CLASS_TEMPLATE, variables),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast.success("Success!", {
        description: `Added ${data.createClassTemplate.name}!`,
      });
      handleOpen(false);
    },
  });

  const handleSubmit = (body: ClassTemplateCreateInput) =>
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
        <ClassTemplateForm
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
