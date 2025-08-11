import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import FormDrawer from "@/components/common/form-drawer";
import { Button } from "@/components/ui/button";

import { memberSchema, type MemberFormData } from "./member.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MemberForm from "./member-form";

type UpdateMemberDrawerProps = {
  id: string | null;
  onClose: () => void;
};

export default function UpdateMemberForm({
  id,
  onClose,
}: UpdateMemberDrawerProps) {
  const { data } = $api.useQuery(
    "get",
    "/members/{id}",
    {
      params: { path: { id: id ?? "" } },
      cache: "no-cache",
    },
    { enabled: !!id }
  );

  const queryClient = useQueryClient();
  const { mutate, isPending } = $api.useMutation("put", "/members/{id}");
  const handleSubmit = (body: UpdateMember) =>
    mutate(
      { body, params: { path: { id: id! } } },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["get", "/members"] });
          toast.success("Success!", {
            description: `Updated ${data?.firstName}'s data!`,
          });
          onClose();
        },
      }
    );

  if (data)
    return (
      <UpdateMemberDrawerWrapper
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

type UpdateMemberDrawerWrapperProps = UpdateMemberDrawerProps & {
  data: MemberFormData;
  onSubmit: (data: MemberFormData) => void;
  isSubmitting: boolean;
};
function UpdateMemberDrawerWrapper({
  id,
  data,
  onClose,
  onSubmit,
  isSubmitting,
}: UpdateMemberDrawerWrapperProps) {
  const form = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: data,
  });

  function handleSubmit(data: MemberFormData) {
    onSubmit(data);
  }
  return (
    <FormDrawer
      title={`Edit ${data?.firstName ?? "Member"}`}
      description="Edit member information"
      drawerProps={{ open: !!id, onClose }}
    >
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <MemberForm
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
