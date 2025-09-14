import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  price: z.object({
    amount: z.coerce
      .number()
      .min(0, { message: "Price must be a positive number" }),
    currency: z.enum(["USD"] as const),
  }),
});

export type ProductFormData = z.infer<typeof productSchema>;
