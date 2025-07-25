import { $api } from "@/api/client.ts";
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
import CreateStaffForm from "@/features/staff/create-staff-form";
import UpdateStaffForm from "@/features/staff/update-staff-form";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

export default function StaffPage() {
  const { data, isLoading } = $api.useQuery("get", "/staff");
  const [editStaffId, setEditStaffId] = useState<string | null>(null);

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
          <CreateStaffForm />
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
