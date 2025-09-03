import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ClassCard from "@/features/classes/class-card";
import UpdateClassForm from "@/features/classes/update-class-form";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { useDialogStore } from "@/stores/dialog-store";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const GET_CLASSES = graphql(`
  query GetClasses {
    classes {
      id
      description
      name
      capacity
      scheduleDateTime
      instructor {
        id
        name
      }
      gym {
        id
        name
      }
    }
  }
`);

export default function ClassesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: () => execute(GET_CLASSES),
  });

  const dialogStore = useDialogStore();
  const [editClassId, setEditClassId] = useState<string | null>(null);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card p-0 min-h-36">
        <Button
          variant="ghost"
          className="h-full"
          onClick={() => dialogStore.openDialog({ type: "createClass" })}
        >
          <IconPlus />
          <span className="hidden lg:inline">Add Class</span>
        </Button>
      </Card>
      {isLoading &&
        Array(5)
          .fill(null)
          .map((_, i) => <Skeleton className="h-full min-h-36" key={i} />)}
      {data?.classes.map((c) => (
        <ClassCard
          key={c.id}
          gymClass={{
            capacity: c.capacity,
            name: c.name,
            scheduleDateTime: c.scheduleDateTime,
            description: c.description ?? "",
            gymName: c.gym?.name,
            instructorName: c.instructor?.name ?? "",
          }}
          cardProps={{
            onClick: () => setEditClassId(c.id),
          }}
        />
      ))}
      <UpdateClassForm id={editClassId} onClose={() => setEditClassId(null)} />
    </div>
  );
}
