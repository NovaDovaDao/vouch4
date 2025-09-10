import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import FormDrawer from "@/components/common/form-drawer";
import { Button } from "@/components/ui/button";

import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import type { DeleteScheduledClassMutationVariables } from "@/graphql/graphql";
import { DataTable } from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";
import MoreDropDown from "@/components/common/more-dropdown";

const GET_SCHEDULED_CLASS_BY_ID = graphql(`
  query GetScheduledClassById($id: ID!) {
    scheduledClassById(id: $id) {
      name
      description
      startTime
      endTime
      instructor {
        name
      }
      bookings {
        id
        member {
          id
          name
          isActive
        }
      }
      gym {
        id
        name
      }
    }
  }
`);

const DELTE_SCHEDULED_CLASS = graphql(`
  mutation DeleteScheduledClass($id: ID!) {
    deleteScheduledClass(id: $id)
  }
`);

type Props = {
  id: string | null;
  onClose: () => void;
};
export default function ScheduledClassDetails({ id, onClose }: Props) {
  const { data: scheduledClass, isLoading } = useQuery({
    queryKey: ["classTemplates", id],
    queryFn: () => execute(GET_SCHEDULED_CLASS_BY_ID, { id: id! }),
    enabled: !!id,
    select: (data) => data.scheduledClassById,
  });

  const queryClient = useQueryClient();
  const { mutate: deleteScheduledClass } = useMutation({
    mutationKey: ["classTemplates", "update", id],
    mutationFn: (variables: DeleteScheduledClassMutationVariables) =>
      execute(DELTE_SCHEDULED_CLASS, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classTemplates"] });
      toast.success("Success!", {
        description: `Deleted ${scheduledClass?.name}!`,
      });
      onClose();
    },
  });

  return (
    <FormDrawer
      title={`${scheduledClass?.name ?? "Class"}`}
      description={scheduledClass?.description ?? ""}
      drawerProps={{ open: !!id, onClose }}
    >
      <div className="flex flex-col gap-2 overflow-y-auto px-4 text-sm">
        <p>With {scheduledClass?.instructor?.name}</p>
        <p>@ {scheduledClass?.gym?.name}</p>
        <hr />
        <h3>Bookings</h3>
        <DataTable
          data={scheduledClass?.bookings ?? []}
          loading={isLoading}
          columns={[
            {
              accessorKey: "name",
              header: "Name",
              cell: ({ row }) => <span>{row.original.member.name}</span>,
            },
            {
              accessorKey: "isActive",
              header: "Status",
              cell: ({ row }) => (
                <Badge
                  variant="outline"
                  className="text-muted-foreground px-1.5"
                >
                  {row.original.member.isActive ? (
                    <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                  ) : (
                    <IconLoader />
                  )}
                  {row.original.member.isActive ? "Active" : "Inactive"}
                </Badge>
              ),
            },
            {
              id: "actions",
              cell: () => (
                <div className="text-right">
                  <MoreDropDown
                    items={[[{ children: "Delete", variant: "destructive" }]]}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
      <DrawerFooter>
        <Button onClick={() => deleteScheduledClass} variant="destructive">
          Delete
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Done</Button>
        </DrawerClose>
      </DrawerFooter>
    </FormDrawer>
  );
}
