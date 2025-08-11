import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import GymCard from "@/features/gyms/gym-card";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { useDialogStore } from "@/stores/dialog-store";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

const GET_GYMS = graphql(`
  query GetGyms {
    gyms {
      id
      address
      name
      legalDocsUrl
      updatedAt
    }
  }
`);

export default function GymsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["gyms"],
    queryFn: () => execute(GET_GYMS),
  });
  const dialogStore = useDialogStore();

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card p-0 min-h-36">
        <Button
          variant="ghost"
          className="h-full"
          onClick={() => dialogStore.openDialog({ type: "createGym" })}
        >
          <IconPlus />
          <span className="hidden lg:inline">Add Gym</span>
        </Button>
      </Card>
      {isLoading &&
        Array(5)
          .fill(null)
          .map((_, i) => <Skeleton className="h-full min-h-36" key={i} />)}
      {data?.gyms.map((gym) => (
        <GymCard key={gym.id} gym={gym} />
      ))}
    </div>
  );
}
