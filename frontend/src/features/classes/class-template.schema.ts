import { z } from "zod";

export const classTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  capacity: z.number().min(1, "Capacity must be greater than 0"),
  recurrence: z.string().min(1, "Recurrence is required"),
  gymId: z.string().min(1, "Gym is required"),
  instructorId: z.string().optional(),
});

export type ClassTemplateFormData = z.infer<typeof classTemplateSchema>;
