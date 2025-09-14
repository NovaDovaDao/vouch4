import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/features/products/product-card";
import UpdateProductForm from "@/features/products/update-product-form";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { useDialogStore } from "@/stores/dialog-store";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// I'm assuming the product has these fields.
const GET_PRODUCTS = graphql(`
  query GetProducts {
    products {
      id
      name
      price {
        amount
        currency
      }
      description
    }
  }
`);

export default function ProductsPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => execute(GET_PRODUCTS),
    select: (data) => data.products ?? [],
  });
  const dialogStore = useDialogStore();
  const [editProductId, setEditProductId] = useState<string | null>(null);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card p-0 min-h-36">
        <Button
          variant="ghost"
          className="h-full"
          onClick={() => dialogStore.openDialog({ type: "createProduct" })}
        >
          <IconPlus />
          <span className="hidden lg:inline">Add Product</span>
        </Button>
      </Card>
      {isLoading &&
        Array(5)
          .fill(null)
          .map((_, i) => <Skeleton className="h-full min-h-36" key={i} />)}
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          cardProps={{ onClick: () => setEditProductId(product.id) }}
        />
      ))}
      <UpdateProductForm
        id={editProductId}
        onClose={() => setEditProductId(null)}
      />
    </div>
  );
}
