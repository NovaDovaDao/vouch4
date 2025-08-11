import { DataTable } from "@/components/common/data-table";
import MoreDropDown from "@/components/common/more-dropdown";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdateMemberForm from "@/features/members/update-member-form";
import {
  IconCircleCheckFilled,
  IconLoader,
  IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { useDialogStore } from "@/stores/dialog-store";
import { graphql } from "@/graphql";
import { useQuery } from "@tanstack/react-query";
import { execute } from "@/graphql/execute";

const GET_MEMBERS = graphql(`
  query GetMembers {
    members {
      id
      firstName
      lastName
      email
      isActive
      updatedAt
    }
  }
`);

export default function MembersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: () => execute(GET_MEMBERS),
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
        <Select defaultValue="outline">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">Gym 1</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="outline">
            Gym 1 <Badge variant="secondary">3</Badge>
          </TabsTrigger>
        </TabsList>
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
          data={data?.members ?? []}
          loading={isLoading}
          columns={[
            {
              accessorKey: "Name",
              header: "Name",
              cell: ({ row }) =>
                [row.original.lastName, row.original.firstName]
                  .filter((v) => !!v)
                  .join(", "),
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
                <div className="text-right">
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
                </div>
              ),
            },
          ]}
        />
        <UpdateMemberForm
          id={editMemberId}
          onClose={() => setEditMemberId(null)}
        />
      </TabsContent>
    </Tabs>
  );
}
