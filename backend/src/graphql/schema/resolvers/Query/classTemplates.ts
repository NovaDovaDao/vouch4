import z from "zod";
import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";

const classTemplateMetadataSchema = z.object({
  capacity: z.int(),
  description: z.string(),
});

export const classTemplates: NonNullable<
  QueryResolvers["classTemplates"]
> = async (_parent, _arg, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  const results = await ctx.db.classTemplate.findMany({
    where: { gym: { tenancyId: ctx.user.tenancyId } },
    include: {
      gym: true,
      instructor: true,
    },
  });

  return results.map((r) => {
    const parsedMetadata = classTemplateMetadataSchema.parse(r.metadata);
    return {
      capacity: parsedMetadata.capacity,
      gym: r.gym,
      id: r.id,
      name: r.name,
      recurrence: r.recurrence,
      description: parsedMetadata.description,
      instructor: r.instructor,
    };
  });
};
