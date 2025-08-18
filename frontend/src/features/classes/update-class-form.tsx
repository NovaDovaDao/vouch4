import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import FormDrawer from "@/components/common/form-drawer";
import { Button } from "@/components/ui/button";

import { classSchema, type ClassFormData } from "./class.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ClassForm from "./class-form";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import type { UpdateClassMutationVariables } from "@/graphql/graphql";

const GET_CLASS_BY_ID = graphql(`
  query GetClassById($id: ID!) {
    classById(id: $id) {
      capacity
      description
      gym {
        id
        name
      }
      instructor {
        id
        name
      }
      name
      scheduleDateTime
    }
  }
`);

const UPDATE_CLASS = graphql(`
  mutation UpdateClass($id: ID!, $data: ClassUpdateInput!) {
    updateClass(id: $id, data: $data) {
      id
      name
    }
  }
`);

type UpdateClassDrawerProps = {
  id: string | null;
  onClose: () => void;
};
export default function UpdateClassForm({
  id,
  onClose,
}: UpdateClassDrawerProps) {
  const { data } = useQuery({
    queryKey: ["staff", id],
    queryFn: () => execute(GET_CLASS_BY_ID, { id: id! }),
    enabled: !!id,
    select: (data) => data.classById,
  });

  const queryClient = useQueryClient();
  const { mutate: updateStaff, isPending } = useMutation({
    mutationKey: ["staff", "update", id],
    mutationFn: (variables: UpdateClassMutationVariables) =>
      execute(UPDATE_CLASS, variables),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast.success("Success!", {
        description: `Updated ${data.updateClass.name}'s data!`,
      });
      onClose();
    },
  });
  const handleSubmit = (body: ClassFormData) =>
    updateStaff({ id: id!, data: body });

  if (data)
    return (
      <UpdateClassDrawerWrapper
        id={id}
        data={{
          capacity: data.capacity,
          description: data.description ?? "",
          gymId: data.gym?.id ?? "",
          instructorId: data.instructor?.id ?? "",
          name: data.name,
          scheduleDateTime: data.scheduleDateTime,
        }}
        onClose={onClose}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    );
}

type UpdateClassDrawerWrapperProps = UpdateClassDrawerProps & {
  data: ClassFormData;
  onSubmit: (data: ClassFormData) => void;
  isSubmitting: boolean;
};
function UpdateClassDrawerWrapper({
  id,
  data,
  onClose,
  onSubmit,
  isSubmitting,
}: UpdateClassDrawerWrapperProps) {
  const form = useForm({
    resolver: zodResolver(classSchema),
    defaultValues: data,
  });

  function handleSubmit(data: ClassFormData) {
    onSubmit(data);
  }
  return (
    <FormDrawer
      title={`Edit ${data?.name ?? "Staff"}`}
      description="Edit Staff information"
      drawerProps={{ open: !!id, onClose }}
    >
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <ClassForm
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
