import { $api } from "@/api/client.ts";
import { DataTable } from "@/components/common/data-table";
import MoreDropDown from "@/components/common/more-dropdown";
import { Badge } from "@/components/ui/badge";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";

export default function StaffPage() {
  const { data, isLoading } = $api.useQuery("get", "/staff");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading staff...</p>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-6">
      <DataTable
        data={data ?? []}
        columns={[
          {
            accessorKey: "firstName",
            header: "First Name",
          },
          {
            accessorKey: "lastName",
            header: "Last Name",
          },
          {
            accessorKey: "email",
            header: "Email",
          },
          {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ row }) => (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.isActive ? (
                  <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                ) : (
                  <IconLoader />
                )}
                {row.original.isActive ? "Active" : "Inactive"}
              </Badge>
            ),
          },
          {
            accessorKey: "phoneNumber",
            header: "Phone",
          },
          {
            accessorKey: "updatedAt",
            header: "Updated",
          },
          {
            id: "actions",
            cell: () => <MoreDropDown items={[]} />,
          },
        ]}
      />
    </div>
  );
}
