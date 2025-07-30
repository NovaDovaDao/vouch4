import { z } from "zod";

export const classSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  scheduleDateTime: z.string().datetime(),
  capacity: z.number().int().positive(),
  gymId: z.string(),
  instructorId: z.string().nullable(),
});

export type ClassFormData = z.infer<typeof classSchema>;
