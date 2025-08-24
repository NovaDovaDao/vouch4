import { DataTable } from "@/components/common/data-table";
import MoreDropDown from "@/components/common/more-dropdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { useDialogStore } from "@/stores/dialog-store";
import { IconCircleCheckFilled, IconLoader, IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

const GET_MEMBERS = graphql(`
  query GetMemberships {
    memberships {
      id
    }
  }
`);

export default function ReportsMembershipsPage() {
  const { data: memberships, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: () => execute(GET_MEMBERS),
    select: data => data.memberships
  });

    const [editMembershipId, setEditMembershipId] = useState<string | null>(null);
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
          <Button variant="outline" size="sm" 
            onClick={() => dialogStore.openDialog({ type: "createStaff" })}>
            <IconPlus />
            <span className="hidden lg:inline">Add Membership</span>
          </Button>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
<DataTable
          data={memberships ?? []}
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
                  {row.original.id ? (
                    <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                  ) : (
                    <IconLoader />
                  )}
                  {row.original.id ? "Active" : "Inactive"}
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
                formatDistanceToNow(row.original.id, {
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
                        onClick: () => setEditMembershipId(row.original.id),
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
            <UpdateStaffForm id={editMembershipId} onClose={() => setEditMembershipId(null)} />
    </Tabs>
  );
}
