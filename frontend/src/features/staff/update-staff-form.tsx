import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import FormDrawer from "@/components/common/form-drawer";
import { Button } from "@/components/ui/button";

import { staffSchema, type StaffFormData } from "./staff.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import StaffForm from "./staff-form";

type UpdateStaffDrawerProps = {
  id: string | null;
  onClose: () => void;
};
export default function UpdateStaffForm({
  id,
  onClose,
}: UpdateStaffDrawerProps) {
  const { data } = $api.useQuery(
    "get",
    "/staff/{id}",
    {
      params: { path: { id: id ?? "" } },
      cache: "no-cache",
    },
    { enabled: !!id }
  );

  const queryClient = useQueryClient();
  const { mutate, isPending } = $api.useMutation("put", "/staff/{id}");
  const handleSubmit = (body: UpdateStaff) =>
    mutate(
      { body, params: { path: { id: id! } } },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["get", "/staff"] });
          toast.success("Success!", {
            description: `Updated ${data?.firstName}'s data!`,
          });
          onClose();
        },
      }
    );

  if (data)
    return (
      <UpdateStaffDrawerWrapper
        id={id}
        data={{
          email: data.email,
          firstName: data.firstName,
          isActive: data.isActive,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber ?? "",
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
