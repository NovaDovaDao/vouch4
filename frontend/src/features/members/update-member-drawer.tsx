import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { $api, type UpdateMember } from "@/api/client";
import FormDrawer from "@/components/common/form-drawer";
import MemberForm from "./member-form";
import { type UpdateMemberFormData, updateMemberSchema } from "./member.schema";

type UpdateMemberDrawerProps = {
  id: string | null;
  onClose: () => void;
};
export default function UpdateMemberDrawer(props: UpdateMemberDrawerProps) {
  const queryClient = useQueryClient();
  const [initialData, setInitialData] = useState<UpdateMemberFormData | null>(
    null
  );

  const { data, isLoading, isSuccess } = $api.useQuery(
    "get",
    "/members/{id}",
    {
      params: { path: { id: props.id ?? "" } },
    },
    { enabled: !!props.id }
  );

  useEffect(() => {
    if (!isSuccess) {
      setInitialData(null);
      return;
    }
    setInitialData(updateMemberSchema.parse(data));
  }, [isSuccess, data]);

  const { mutate, isPending } = $api.useMutation("put", "/members/{id}");
  const handleSubmit = (body: UpdateMember) =>
    mutate(
      { body, params: { path: { id: props.id! } } },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["get", "/members"] });
          toast.success("Success!", {
            description: `Updated ${data?.firstName}'s data!`,
          });
        },
      }
    );

  const isDrawerOpen = useMemo(() => !!props.id, [props.id]);
  useEffect(() => {
    if (!isDrawerOpen) setInitialData(null);
  }, [isDrawerOpen]);

  if (isLoading) return <p>Loading member...</p>;

  if (initialData)
    return (
      <FormDrawer
        title="Edit Member"
        drawerProps={{ open: isDrawerOpen, onClose: props.onClose }}
      >
        <MemberForm
          initialData={initialData}
          isLoading={isPending}
          onFormSubmit={handleSubmit}
        />
      </FormDrawer>
    );
}
