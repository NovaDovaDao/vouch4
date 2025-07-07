import { type PropsWithChildren } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { $api } from "@/api/client";
import FormDrawer from "@/components/common/form-drawer";
import MemberForm from "./member-form";
import type { CreateMemberFormData } from "./member.schema";

const initialData: CreateMemberFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  isActive: true,
};

export default function CreateMemberDrawer(props: PropsWithChildren) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = $api.useMutation("post", "/members");

  const handleSubmit = (body: typeof initialData) =>
    mutate(
      { body },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["get", "/members"] });
          toast.success("Success!", {
            description: `Added ${data.firstName}!`,
          });
        },
      }
    );

  return (
    <FormDrawer title="Add Member" trigger={props.children}>
      <MemberForm
        initialData={initialData}
        isLoading={isPending}
        onFormSubmit={handleSubmit}
      />
    </FormDrawer>
  );
}
