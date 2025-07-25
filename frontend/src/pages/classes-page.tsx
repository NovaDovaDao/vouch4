import { $api } from "@/api/client.ts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ClassCard from "@/features/classes/class-card";
import { useDialogStore } from "@/stores/dialog-store";
import { IconPlus } from "@tabler/icons-react";

export default function ClassesPage() {
  const { data, isLoading } = $api.useQuery("get", "/classes");
  const dialogStore = useDialogStore();

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
      {data?.map((c) => (
        <ClassCard key={c.id} />
      ))}
    </div>
  );
}
