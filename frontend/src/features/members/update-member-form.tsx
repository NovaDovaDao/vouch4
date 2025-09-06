import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import FormDrawer from "@/components/common/form-drawer";
import { Button } from "@/components/ui/button";

import { memberSchema, type MemberFormData } from "./member.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MemberForm from "./member-form";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { UpdateMemberMutationVariables } from "@/graphql/graphql";

const GET_MEMBER_BY_ID = graphql(`
  query GetMemberById($id: ID!) {
    memberById(id: $id) {
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

const UPDATE_MEMBER = graphql(`
  mutation UpdateMember($id: ID!, $input: MemberUpdateInput!) {
    updateMember(id: $id, input: $input) {
      id
      firstName
    }
  }
`);

type UpdateMemberDrawerProps = {
  id: string | null;
  onClose: () => void;
};
export default function UpdateMemberForm({
  id,
  onClose,
}: UpdateMemberDrawerProps) {
  const { data } = useQuery({
    queryKey: ["members", id],
    queryFn: () => execute(GET_MEMBER_BY_ID, { id: id! }),
    enabled: !!id,
  });

  const queryClient = useQueryClient();
  const { mutate: updateMember, isPending } = useMutation({
    mutationKey: ["members", "update", id],
    mutationFn: (variables: UpdateMemberMutationVariables) =>
      execute(UPDATE_MEMBER, variables),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success("Success!", {
        description: `Updated ${data.updateMember.firstName}'s data!`,
      });
      onClose();
    },
  });
  const handleSubmit = (body: MemberFormData) =>
    updateMember({ id: id!, input: body });

  if (data)
    return (
      <UpdateMemberDrawerWrapper
        id={id}
        data={{
          email: data.memberById.email,
          firstName: data.memberById.firstName,
          isActive: data.memberById.isActive,
          lastName: data.memberById.lastName,
          phoneNumber: data.memberById.phoneNumber ?? "",
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
      description="Edit Member information"
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
