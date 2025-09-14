import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import FormDrawer from "@/components/common/form-drawer";
import { Button } from "@/components/ui/button";

import { ProductFormData, productSchema } from "./product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ProductForm from "./product-form";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import {
  GetProductByIdQuery,
  UpdateProductInput,
  UpdateProductMutationVariables,
} from "@/graphql/graphql";

const GET_PRODUCT_BY_ID = graphql(`
  query GetProductById($id: ID!) {
    productById(id: $id) {
      name
      description
      price {
        amount
        currency
      }
    }
  }
`);

const UPDATE_PRODUCT = graphql(`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
    }
  }
`);

type UpdateProductDrawerProps = {
  id: string | null;
  onClose: () => void;
};
export default function UpdateProductForm({
  id,
  onClose,
}: UpdateProductDrawerProps) {
  const { data: product } = useQuery({
    queryKey: ["products", id],
    queryFn: () => execute(GET_PRODUCT_BY_ID, { id: id! }),
    enabled: !!id,
    select: (data) => data.productById,
  });

  const queryClient = useQueryClient();
  const { mutate: updateProduct, isPending } = useMutation({
    mutationKey: ["products", "update", id],
    mutationFn: (variables: UpdateProductMutationVariables) =>
      execute(UPDATE_PRODUCT, variables),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Success!", {
        description: `Updated ${data}'s data!`,
      });
      onClose();
    },
  });
  const handleSubmit = (body: UpdateProductInput) =>
    updateProduct({ id: id!, input: body });

  if (product)
    return (
      <UpdateProductDrawerWrapper
        id={id}
        data={product}
        onClose={onClose}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    );
}

type UpdateProductDrawerWrapperProps = UpdateProductDrawerProps & {
  data: GetProductByIdQuery["productById"];
  onSubmit: (data: ProductFormData) => void;
  isSubmitting: boolean;
};
function UpdateProductDrawerWrapper({
  id,
  data,
  onClose,
  onSubmit,
  isSubmitting,
}: UpdateProductDrawerWrapperProps) {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: productSchema.parse(data),
  });

  function handleSubmit(formData: ProductFormData) {
    onSubmit(formData);
  }
  return (
    <FormDrawer
      title={`Edit ${data?.name ?? "Product"}`}
      description="Edit Product information"
      drawerProps={{ open: !!id, onClose }}
    >
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <ProductForm form={form} onSubmit={handleSubmit} />
      </div>
      <DrawerFooter>
        <Button
          onClick={form.handleSubmit(handleSubmit)}
          disabled={isSubmitting}
        >
          Submit
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Done</Button>
        </DrawerClose>
      </DrawerFooter>
    </FormDrawer>
  );
}
