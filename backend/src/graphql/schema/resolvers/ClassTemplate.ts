import { z } from "zod/mini";
import type { ClassTemplateResolvers } from "./../types.generated.js";
import type { CustomContext } from "../../../server.js";

const classTemplateMetadataSchema = z.object({
  capacity: z.int(),
  description: z.string(),
});

export const ClassTemplate: ClassTemplateResolvers = {
  capacity: (parent, _arg, ctx) =>
    classTemplateMetadataSchema.parse(parent.metadata).capacity,
  description: (parent, _arg, ctx) =>
    classTemplateMetadataSchema.parse(parent.metadata).description,
  gym: (parent, _arg, ctx: CustomContext) => {
    return ctx.db.gym.findUniqueOrThrow({
      where: { id: parent.gymId },
    });
  },
  instructor: (parent, _arg, ctx: CustomContext) => {
    if (!parent.instructorId) return null;
    return ctx.db.user.findUnique({
      where: { id: parent.instructorId },
    });
  },
};
