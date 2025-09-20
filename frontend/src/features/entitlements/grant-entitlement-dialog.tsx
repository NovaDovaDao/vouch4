import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { execute } from "@/graphql/execute";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { graphql } from "@/graphql";
import {
  CreateEntitlementMutationVariables,
  GetProductsQuery,
} from "@/graphql/graphql";

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

const CREATE_ENTITLEMENT_MUTATION = graphql(`
  mutation CreateEntitlement($input: CreateEntitlementInput!) {
    createEntitlement(input: $input) {
      id
    }
  }
`);

const entitlementSchema = z.object({
  productId: z.string(),
  validFrom: z.string(),
  expiresAt: z.string().optional(),
});

type EntitlementFormData = z.infer<typeof entitlementSchema>;

export default function GrantEntitlementDialog({
  handleOpen,
  memberId,
}: {
  handleOpen: (open: boolean) => void;
  memberId: string;
}) {
  const [selectedProduct, setSelectedProduct] = useState<
    GetProductsQuery["products"][0] | null
  >(null);

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () => execute(GET_PRODUCTS),
    select: (data) => data.products ?? [],
  });

  const form = useForm<EntitlementFormData>({
    resolver: zodResolver(entitlementSchema),
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-entitlement"],
    mutationFn: (variables: CreateEntitlementMutationVariables) =>
      execute(CREATE_ENTITLEMENT_MUTATION, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members", memberId],
      });
      toast.success("Success!", {
        description: `Entitlement granted!`,
      });
      handleOpen(false);
    },
  });

  const handleSubmit = (body: EntitlementFormData) => {
    mutate({
      input: { ...body, ownerId: memberId },
    });
  };

  return (
    <Dialog open onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Grant Entitlement</DialogTitle>
        </DialogHeader>

        {!selectedProduct ? (
          <div>
            <h3 className="font-bold mb-2">Select a Product</h3>
            {isLoadingProducts && <p>Loading products...</p>}
            <div className="flex flex-col gap-2">
              {products?.map((product) => (
                <Button
                  key={product.id}
                  variant="outline"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <h3 className="font-bold">{selectedProduct.name}</h3>
            <input
              type="hidden"
              {...form.register("productId", { value: selectedProduct.id })}
            />
            <div>
              <Label htmlFor="validFrom">Valid From</Label>
              <Input
                id="validFrom"
                type="date"
                {...form.register("validFrom")}
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <Label htmlFor="expiresAt">Expires At (optional)</Label>
              <Input
                id="expiresAt"
                type="date"
                {...form.register("expiresAt")}
              />
            </div>
          </form>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {selectedProduct && (
            <Button
              onClick={form.handleSubmit(handleSubmit)}
              disabled={isPending}
            >
              Grant
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
