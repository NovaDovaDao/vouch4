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
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const GET_TENANCY = graphql(`
  query GetTenancy {
    tenancy {
      id
      contactEmail
      legalName
      name
    }
  }
`);

// const UPDATE_TENANCY = graphql(`
// mutation UppdateTenancy(input: UpdateTenancyInput!) {
//   id
// }
//  `);

export default function AccountPage() {
  const {
    data: account,
    dataUpdatedAt,
    isLoading,
  } = useQuery({ queryKey: ["tenancy"], queryFn: () => execute(GET_TENANCY) });
  const { isPending } = useMutation({
    mutationKey: ["update-tenancy"],
    // mutationFn: (input) => execute(UPDATE_TENANCY),
  });
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
        contactEmail: account?.tenancy.contactEmail ?? "",
        legalName: account?.tenancy.legalName ?? "",
        name: account?.tenancy.name ?? "",
      });
    }
  }, [dataUpdatedAt, account, form]);

  const queryClient = useQueryClient();
  const handleSubmit = (body: AccountFormData) => {
    queryClient.invalidateQueries({ queryKey: ["get", "/staff"] });
    toast.success("Success!", {
      description: `Added ${body.name}!`,
    });
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
