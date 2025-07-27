import { z } from "zod";

export const classSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  scheduleDateTime: z.date(),
  capacity: z.number().int().positive(),
  gymId: z.string(),
  instructorId: z.string().optional(),
});

export type ClassFormData = z.infer<typeof classSchema>;
