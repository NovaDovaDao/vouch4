import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import FormDrawer from "@/components/common/form-drawer";
import { Button } from "@/components/ui/button";

import { staffSchema, type StaffFormData } from "./staff.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import StaffForm from "./staff-form";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import type {
  UpdateStaffMutationVariables,
  StaffUpdateInput,
} from "@/graphql/graphql";

const GET_STAFF_BY_ID = graphql(`
  query GetStaffById($id: ID!) {
    staffById(id: $id) {
      email
      firstName
      id
      isActive
      lastName
      walletAddress
      phoneNumber
    }
  }
`);

const UPDATE_STAFF = graphql(`
  mutation UpdateStaff($id: ID!, $input: StaffUpdateInput!) {
    updateStaff(id: $id, input: $input) {
      id
      firstName
    }
  }
`);

type UpdateStaffDrawerProps = {
  id: string | null;
  onClose: () => void;
};
export default function UpdateStaffForm({
  id,
  onClose,
}: UpdateStaffDrawerProps) {
  const { data } = useQuery({
    queryKey: ["staff", id],
    queryFn: () => execute(GET_STAFF_BY_ID, { id: id! }),
    enabled: !!id,
  });

  const queryClient = useQueryClient();
  const { mutate: updateStaff, isPending } = useMutation({
    mutationKey: ["staff", "update", id],
    mutationFn: (variables: UpdateStaffMutationVariables) =>
      execute(UPDATE_STAFF, variables),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      toast.success("Success!", {
        description: `Updated ${data.updateStaff.firstName}'s data!`,
      });
      onClose();
    },
  });
  const handleSubmit = (body: StaffUpdateInput) =>
    updateStaff({ id: id!, input: body });

  if (data)
    return (
      <UpdateStaffDrawerWrapper
        id={id}
        data={{
          email: data.staffById.email,
          firstName: data.staffById.firstName,
          isActive: data.staffById.isActive,
          lastName: data.staffById.lastName,
          phoneNumber: data.staffById.phoneNumber ?? "",
        }}
        onClose={onClose}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    );
}

type UpdateStaffDrawerWrapperProps = UpdateStaffDrawerProps & {
  data: StaffFormData;
  onSubmit: (data: StaffFormData) => void;
  isSubmitting: boolean;
};
function UpdateStaffDrawerWrapper({
  id,
  data,
  onClose,
  onSubmit,
  isSubmitting,
}: UpdateStaffDrawerWrapperProps) {
  const form = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues: data,
  });

  function handleSubmit(data: StaffFormData) {
    onSubmit(data);
  }
  return (
    <FormDrawer
      title={`Edit ${data?.firstName ?? "Staff"}`}
      description="Edit Staff information"
      drawerProps={{ open: !!id, onClose }}
    >
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <StaffForm
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
