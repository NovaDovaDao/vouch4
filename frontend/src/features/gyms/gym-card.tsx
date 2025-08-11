import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Gym } from "@/graphql/graphql";
import { IconClipboardData, IconMap2 } from "@tabler/icons-react";
import { formatDistanceToNow } from "date-fns";
import type { PropsWithChildren } from "react";

export default function GymCard({
  gym,
}: PropsWithChildren<{
  gym: Pick<Gym, "name" | "legalDocsUrl" | "address" | "updatedAt">;
}>) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {gym.name}
        </CardTitle>
        <CardAction>
          {!!gym.legalDocsUrl && (
            <Badge variant="outline">
              <IconClipboardData />
            </Badge>
          )}
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {gym.address?.street1}, {gym.address?.city}{" "}
          <IconMap2 className="size-4" />
        </div>
        <div className="text-muted-foreground">
          Updated {formatDistanceToNow(gym.updatedAt)}
        </div>
      </CardFooter>
    </Card>
  );
}
