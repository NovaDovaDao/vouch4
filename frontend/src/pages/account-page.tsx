import { $api } from "@/api/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AccountForm from "@/features/account/account-form";
import {
  accountSchema,
  type AccountFormData,
} from "@/features/account/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { WandSparklesIcon } from "lucide-react";
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
    <div className="px-4 lg:px-6 sm:max-w-sm space-y-6">
      {!account && (
        <Alert variant="destructive">
          <WandSparklesIcon />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            We need to setup your account first!
          </AlertDescription>
        </Alert>
      )}
      <AccountForm
        form={form}
        isSubmitting={isPending}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
