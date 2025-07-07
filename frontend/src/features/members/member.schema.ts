import type { CreateMember, UpdateMember } from "@/api/client";
import { z } from "zod";

export const baseMemberSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string(),
  isActive: z.boolean(),
});

export const createMemberSchema = baseMemberSchema.extend(
  {}
) satisfies z.ZodType<CreateMember>;

export const updateMemberSchema = baseMemberSchema.extend({
  id: z.string().uuid("Invalid member ID format"),
}) satisfies z.ZodType<UpdateMember>;

export type CreateMemberFormData = z.infer<typeof createMemberSchema>;
export type UpdateMemberFormData = z.infer<typeof updateMemberSchema>;
