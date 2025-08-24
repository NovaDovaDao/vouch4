import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Too short"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
