import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconCalendar, IconUsersGroup } from "@tabler/icons-react";
import { format } from "date-fns";
import type { ComponentProps, PropsWithoutRef } from "react";

export default function ClassCard({
  gymClass,
  cardProps,
}: PropsWithoutRef<{
  gymClass: {
    name: string;
    description?: string;
    capacity: number;
    scheduleDateTime: string;
    instructorName?: string;
    gymName?: string;
  };
  cardProps?: ComponentProps<typeof Card>;
}>) {
  return (
    <Card className="@container/card" {...cardProps}>
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
        <div className="text-muted-foreground">{gymClass.instructorName}</div>
      </CardFooter>
    </Card>
  );
}
