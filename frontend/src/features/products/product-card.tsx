import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Product } from "@/graphql/graphql";
import type { ComponentProps, PropsWithChildren } from "react";

export default function ProductCard({
  product,
  cardProps,
}: PropsWithChildren<{
  cardProps?: ComponentProps<typeof Card>;
  product: Pick<Product, "name" | "description" | "price">;
}>) {
  return (
    <Card className="@container/card" {...cardProps}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {product.name}
        </CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="outline">
          {product.price?.amount} {product.price?.currency}
        </Badge>
      </CardContent>
    </Card>
  );
}
