import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import ProductForm from "./product-form";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { productSchema } from "./product.schema";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { graphql } from "@/graphql";
// import { execute } from "@/graphql/execute";
// import type {
//   CreateProductMutationVariables,
//   ProductCreateInput,
// } from "@/graphql/graphql";

// const CREATE_PRODUCT = graphql(`
//   mutation CreateProduct($data: ProductCreateInput!) {
//     createProduct(data: $data) {
//       id
//       name
//     }
//   }
// `);

export default function CreateProductDialog({
  handleOpen,
}: {
  handleOpen: (open: boolean) => void;
}) {
  // const form = useForm({
  //   resolver: zodResolver(productSchema),
  //   defaultValues: {
  //     name: "",
  //     description: "",
  //     price: 0,
  //   },
  // });
  // const queryClient = useQueryClient();
  // const { mutate, isPending } = useMutation({
  //   mutationKey: ["create-product"],
  //   mutationFn: (variables: CreateProductMutationVariables) =>
  //     execute(CREATE_PRODUCT, variables),
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries({ queryKey: ["products"] });
  //     toast.success("Success!", {
  //       description: `Added! ${data.createProduct.name}`,
  //     });
  //     handleOpen(false);
  //   },
  // });

  // const handleSubmit = (body: ProductCreateInput) => {
  //   mutate({
  //     data: body,
  //   });
  // };

  return (
    <Dialog open onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        {/*<ProductForm form={form} onSubmit={handleSubmit} />*/}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {/*<Button
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isPending}
          >
            Save product
          </Button>*/}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
