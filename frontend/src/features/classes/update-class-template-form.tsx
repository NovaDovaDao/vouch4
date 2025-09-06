import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import FormDrawer from "@/components/common/form-drawer";
import { Button } from "@/components/ui/button";

import {
  classTemplateSchema,
  type ClassTemplateFormData,
} from "./class-template.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ClassTemplateForm from "./class-template-form";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import type { UpdateClassTemplateMutationVariables } from "@/graphql/graphql";

const GET_CLASS_TEMPLATE_BY_ID = graphql(`
  query GetClassTemplateById($id: ID!) {
    classTemplateById(id: $id) {
      name
      description
      capacity
      gym {
        id
        name
      }
      instructor {
        id
        name
      }
      recurrence
    }
  }
`);

const UPDATE_CLASS_TEMPLATE = graphql(`
  mutation UpdateClassTemplate($id: ID!, $input: ClassTemplateUpdateInput!) {
    updateClassTemplate(id: $id, input: $input) {
      id
      name
    }
  }
`);

type UpdateClassTemplateDrawerProps = {
  id: string | null;
  onClose: () => void;
};
export default function UpdateClassTemplateForm({
  id,
  onClose,
}: UpdateClassTemplateDrawerProps) {
  const { data } = useQuery({
    queryKey: ["classTemplates", id],
    queryFn: () => execute(GET_CLASS_TEMPLATE_BY_ID, { id: id! }),
    enabled: !!id,
    select: (data) => data.classTemplateById,
  });

  const queryClient = useQueryClient();
  const { mutate: updateClassTemplate, isPending } = useMutation({
    mutationKey: ["classTemplates", "update", id],
    mutationFn: (variables: UpdateClassTemplateMutationVariables) =>
      execute(UPDATE_CLASS_TEMPLATE, variables),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["classTemplates"] });
      toast.success("Success!", {
        description: `Updated ${data.updateClassTemplate.name}'s data!`,
      });
      onClose();
    },
  });
  const handleSubmit = (body: ClassTemplateFormData) =>
    updateClassTemplate({ id: id!, input: body });

  if (data)
    return (
      <UpdateClassTemplateDrawerWrapper
        id={id}
        data={{
          capacity: data.capacity,
          description: data.description ?? "",
          gymId: data.gym?.id ?? "",
          instructorId: data.instructor?.id ?? "",
          name: data.name,
          recurrence: data.recurrence,
        }}
        onClose={onClose}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    );
}

type UpdateClassTemplateDrawerWrapperProps = UpdateClassTemplateDrawerProps & {
  data: ClassTemplateFormData;
  onSubmit: (data: ClassTemplateFormData) => void;
  isSubmitting: boolean;
};
function UpdateClassTemplateDrawerWrapper({
  id,
  data,
  onClose,
  onSubmit,
  isSubmitting,
}: UpdateClassTemplateDrawerWrapperProps) {
  const form = useForm({
    resolver: zodResolver(classTemplateSchema),
    defaultValues: data,
  });

  function handleSubmit(data: ClassTemplateFormData) {
    onSubmit(data);
  }
  return (
    <FormDrawer
      title={`Edit ${data?.name ?? "Class Template"}`}
      description="Edit Class Template information"
      drawerProps={{ open: !!id, onClose }}
    >
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <ClassTemplateForm
          form={form}
          isSubmitting={isSubmitting}
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
