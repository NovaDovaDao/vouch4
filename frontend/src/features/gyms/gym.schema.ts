import { z } from "zod";

export const gymSchema = z.object({
  name: z.string().min(1, "Name is required"),
  legalEntityName: z.string(),
  address: z.object({
    street1: z.string().min(1),
    street2: z.string(),
    street3: z.string(),
    city: z.string().min(1),
    state: z.string(),
    province: z.string(),
    country: z.string(),
    zip: z.string(),
    location: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
});

export type GymFormData = z.infer<typeof gymSchema>;
