import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconUsersGroup } from "@tabler/icons-react";
import type { ComponentProps, PropsWithoutRef } from "react";

export default function ClassTemplateCard({
  classTemplate,
  cardProps,
}: PropsWithoutRef<{
  classTemplate: {
    name: string;
    description?: string;
    capacity: number;
    recurrence: string;
    instructorName?: string;
    gymName?: string;
  };
  cardProps?: ComponentProps<typeof Card>;
}>) {
  return (
    <Card className="@container/card" {...cardProps}>
      <CardHeader>
        <CardDescription>{classTemplate.description}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {classTemplate.name}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <IconUsersGroup />
            {classTemplate.capacity}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {classTemplate.recurrence}
        </div>
        <div className="text-muted-foreground">
          {classTemplate.instructorName}
        </div>
      </CardFooter>
    </Card>
  );
}
