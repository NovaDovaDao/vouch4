import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  legalName: z.string(),
  contactEmail: z.string().email(),
});

export type AccountFormData = z.infer<typeof accountSchema>;
