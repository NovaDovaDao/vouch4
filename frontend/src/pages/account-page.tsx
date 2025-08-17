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
import type { TenancyCreateInput } from "@/graphql/graphql";
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

const CREATE_TENANCY = graphql(`
  mutation CreateTenancy($data: TenancyCreateInput!) {
    createTenancy(data: $data) {
      id
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
    data: tenancy,
    dataUpdatedAt,
    isLoading,
  } = useQuery({
    queryKey: ["tenancy"],
    queryFn: () => execute(GET_TENANCY),
    select: (data) => data.tenancy,
  });

  const { mutateAsync: createTenancy, isPending } = useMutation({
    mutationKey: ["create-tenancy"],
    mutationFn: (data: TenancyCreateInput) => execute(CREATE_TENANCY, { data }),
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
        contactEmail: tenancy?.contactEmail ?? "",
        legalName: tenancy?.legalName ?? "",
        name: tenancy?.name ?? "",
      });
    }
  }, [dataUpdatedAt, tenancy, form]);

  const queryClient = useQueryClient();
  const handleSubmit = async (data: AccountFormData) => {
    await createTenancy(data);
    queryClient.invalidateQueries({ queryKey: ["tenancy", "get-session"] });
    toast.success("Success!", {
      description: `Updated ${data.name}!`,
    });
  };

  return (
    <div className="px-4 lg:px-6">
      <Card className="sm:max-w-sm">
        <CardHeader>
          <CardTitle>Edit Account</CardTitle>
          {!tenancy && (
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
