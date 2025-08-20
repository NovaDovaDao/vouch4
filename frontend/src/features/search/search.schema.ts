import { z } from "zod";

export const searchSchema = z.object({
  input: z.string().min(3, "Search input is too short"),
});

export type SearchFormData = z.infer<typeof searchSchema>;
