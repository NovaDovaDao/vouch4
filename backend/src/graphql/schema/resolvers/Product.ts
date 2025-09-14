import { z } from "zod";
import type { ProductResolvers } from "./../types.generated.js";
import type { CustomContext } from "../../../server.js";
import { priceSchema } from "./Price.js";

const rulesSchema = z.object({
  type: z.enum(["subscription", "punch_card", "access"] as const),
  duration: z.string(),
  uses: z.int(),
  amenity: z.string(),
});

const metaSchema = z.preprocess(
  (val) => val ?? {},
  z.object({
    description: z.string().default(""),
    price: priceSchema,
  }),
);

export const Product: ProductResolvers = {
  description: (parent, _arg, _ctx: CustomContext) =>
    metaSchema.parse(parent.meta).description,
  price: (parent, _arg, _ctx: CustomContext) =>
    metaSchema.parse(parent.meta).price,
  rules: (parent, _arg, _ctx: CustomContext) => rulesSchema.parse(parent.rules),
};
