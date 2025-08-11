import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Class } from "@/graphql/graphql";
import { IconCalendar, IconUsersGroup } from "@tabler/icons-react";
import { format } from "date-fns";
import type { PropsWithoutRef } from "react";

export default function ClassCard({
  gymClass,
}: PropsWithoutRef<{
  gymClass: Pick<
    Class,
    "description" | "name" | "capacity" | "scheduleDateTime" | "instructorId"
  >;
}>) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{gymClass.description}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {gymClass.name}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <IconUsersGroup />
            {gymClass.capacity}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {format(gymClass.scheduleDateTime, "MMMM do, yyyy h:mm aa")}{" "}
          <IconCalendar className="size-4" />
        </div>
        <div className="text-muted-foreground">{gymClass.instructorId}</div>
      </CardFooter>
    </Card>
  );
}
