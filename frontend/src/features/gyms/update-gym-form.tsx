import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import FormDrawer from "@/components/common/form-drawer";
import { Button } from "@/components/ui/button";

import { gymSchema, type GymFormData } from "./gym.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import GymForm from "./gym-form";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import type { UpdateClassMutationVariables } from "@/graphql/graphql";

const GET_GYM_BY_ID = graphql(`
  query GetGymById($id: ID!) {
    gymById(id: $id) {
      name
      address
      legalDocsUrl
      legalEntityName
    }
  }
`);

const UPDATE_GYM = graphql(`
  mutation UpdateGym($id: ID!, $data: GymUpdateInput!) {
    updateGym(id: $id, data: $data) {
      id
      name
    }
  }
`);

type UpdateGymDrawerProps = {
  id: string | null;
  onClose: () => void;
};
export default function UpdateGymForm({ id, onClose }: UpdateGymDrawerProps) {
  const { data } = useQuery({
    queryKey: ["staff", id],
    queryFn: () => execute(GET_GYM_BY_ID, { id: id! }),
    enabled: !!id,
    select: (data) => data.gymById,
  });

  const queryClient = useQueryClient();
  const { mutate: updateStaff, isPending } = useMutation({
    mutationKey: ["staff", "update", id],
    mutationFn: (variables: UpdateClassMutationVariables) =>
      execute(UPDATE_GYM, variables),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["gyms"] });
      toast.success("Success!", {
        description: `Updated ${data.updateGym.name}'s data!`,
      });
      onClose();
    },
  });
  const handleSubmit = (body: GymFormData) =>
    updateStaff({ id: id!, data: body });

  if (data)
    return (
      <UpdateGymDrawerWrapper
        id={id}
        data={{
          address: data.address,
          name: data.name,
          legalDocsUrl: data.legalDocsUrl ?? "",
          legalEntityName: data.legalEntityName ?? "",
        }}
        onClose={onClose}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    );
}

type UpdateClassDrawerWrapperProps = UpdateGymDrawerProps & {
  data: GymFormData;
  onSubmit: (data: GymFormData) => void;
  isSubmitting: boolean;
};
function UpdateGymDrawerWrapper({
  id,
  data,
  onClose,
  onSubmit,
  isSubmitting,
}: UpdateClassDrawerWrapperProps) {
  const form = useForm({
    resolver: zodResolver(gymSchema),
    defaultValues: data,
  });

  function handleSubmit(data: GymFormData) {
    onSubmit(data);
  }
  return (
    <FormDrawer
      title={`Edit ${data?.name ?? "Staff"}`}
      description="Edit Staff information"
      drawerProps={{ open: !!id, onClose }}
    >
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <GymForm
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
