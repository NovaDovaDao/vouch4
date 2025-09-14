import { Link } from "react-router-dom";
import { DataTable } from "@/components/common/data-table";
import MoreDropDown from "@/components/common/more-dropdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import UpdateMemberForm from "@/features/members/update-member-form";
import { execute } from "@/graphql/execute";
import { useDialogStore } from "@/stores/dialog-store";
import {
  IconCircleCheckFilled,
  IconLoader,
  IconPlus,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { graphql } from "@/graphql";

const GET_MEMBERS = graphql(`
  query GetMembers1 {
    members {
      id
      firstName
      lastName
      email
      isActive
      phoneNumber
    }
  }
`);

export default function MembersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: () => execute(GET_MEMBERS),
    select: (data) => data.members,
  });
  const [editMemberId, setEditMemberId] = useState<string | null>(null);
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
            onClick={() => dialogStore.openDialog({ type: "createMember" })}
          >
            <IconPlus />
            <span className="hidden lg:inline">Add Member</span>
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
              cell: ({ row }) => (
                <Link to={`/members/${row.original.id}`}>
                  {row.original.firstName}
                </Link>
              ),
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
              id: "actions",
              cell: ({ row }) => (
                <MoreDropDown
                  items={[
                    [
                      {
                        children: "Edit",
                        onClick: () => setEditMemberId(row.original.id),
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
      <UpdateMemberForm
        id={editMemberId}
        onClose={() => setEditMemberId(null)}
      />
    </Tabs>
  );
}
