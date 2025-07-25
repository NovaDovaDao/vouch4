import { z } from "zod";

export const classSchema = z.object({
  name: z.string().min(1, "Name is required"),
  isActive: z.boolean(),
});

export type ClassFormData = z.infer<typeof classSchema>;
