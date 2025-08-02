import { $api } from "@/api/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AccountForm from "@/features/account/account-form";
import {
  accountSchema,
  type AccountFormData,
} from "@/features/account/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AccountPage() {
  const {
    data: account,
    dataUpdatedAt,
    isLoading,
  } = $api.useQuery("get", "/tenancy");
  const { mutate, isPending } = $api.useMutation("post", "/tenancy");
  const form = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      contactEmail: "",
      legalName: "",
      name: "",
    },
  });

  useEffect(() => {
    if (dataUpdatedAt) {
      form.reset({
        contactEmail: account?.contactEmail ?? "",
        legalName: account?.legalName ?? "",
        name: account?.name ?? "",
      });
    }
  }, [dataUpdatedAt, account, form]);

  const queryClient = useQueryClient();
  const handleSubmit = (body: AccountFormData) => {
    mutate(
      {
        body,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["get", "/staff"] });
          toast.success("Success!", {
            description: `Added ${data.name}!`,
          });
        },
      }
    );
  };

  return (
    <div className="px-4 lg:px-6">
      <Card className="sm:max-w-sm">
        <CardHeader>
          <CardTitle>Edit Account</CardTitle>
          {!account && (
            <CardDescription>
              We need to setup your account first!
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <AccountForm
            form={form}
            isSubmitting={isPending}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
