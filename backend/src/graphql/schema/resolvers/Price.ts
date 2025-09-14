import { z } from "zod";
import type { PriceResolvers } from "./../types.generated.js";

export const priceSchema = z.preprocess(
  (val) => val ?? {},
  z.object({
    amount: z.string().default("0"),
    currency: z.string().default("USD"),
  }),
);

export const Price: PriceResolvers = {};
