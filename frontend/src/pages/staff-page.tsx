import { DataTable } from "@/components/common/data-table";
import MoreDropDown from "@/components/common/more-dropdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import UpdateStaffForm from "@/features/staff/update-staff-form";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { useDialogStore } from "@/stores/dialog-store";
import {
  IconCircleCheckFilled,
  IconLoader,
  IconPlus,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

const GET_STAFF = graphql(`
  query GetStaff {
    staff {
      id
      email
      phoneNumber
      firstName
      lastName
      updatedAt
      isActive
    }
  }
`);

export default function StaffPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["staff"],
    queryFn: () => execute(GET_STAFF),
    select: (data) => data.staff,
  });
  const [editStaffId, setEditStaffId] = useState<string | null>(null);
  const dialogStore = useDialogStore();

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between  px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => dialogStore.openDialog({ type: "createStaff" })}
          >
            <IconPlus />
            <span className="hidden lg:inline">Add Staff</span>
          </Button>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <DataTable
          data={data ?? []}
          loading={isLoading}
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
                <Badge
                  variant="outline"
                  className="text-muted-foreground px-1.5"
                >
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
              cell: ({ row }) =>
                formatDistanceToNow(row.original.updatedAt, {
                  addSuffix: true,
                  includeSeconds: true,
                }),
            },
            {
              id: "actions",
              cell: ({ row }) => (
                <MoreDropDown
                  items={[
                    [
                      {
                        children: "Edit",
                        onClick: () => setEditStaffId(row.original.id),
                      },
                      {
                        children: "Send Invite",
                      },
                    ],
                    [{ children: "Delete", variant: "destructive" }],
                  ]}
                />
              ),
            },
          ]}
        />
      </TabsContent>
      <UpdateStaffForm id={editStaffId} onClose={() => setEditStaffId(null)} />
    </Tabs>
  );
}
