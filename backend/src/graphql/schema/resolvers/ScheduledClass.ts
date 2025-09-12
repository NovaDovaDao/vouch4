import type { CustomContext } from "../../../server.js";
import type { ScheduledClassResolvers } from "./../types.generated.js";

export const ScheduledClass: ScheduledClassResolvers = {
  // The `name` of a ScheduledClass is inherited from its ClassTemplate.
  // NOTE: This approach can lead to N+1 queries. In a production environment,
  // consider using a DataLoader to batch these requests.
  name: async (parent, _args, ctx) => {
    const template = await ctx.db.classTemplate.findUnique({
      where: { id: parent.classTemplateId },
      select: { name: true },
    });
    // The name on ScheduledClass is non-nullable, so provide a fallback.
    return template?.name ?? "Untitled Class";
  },

  // Correctly fetches bookings for the parent ScheduledClass.
  bookings: async (parent, _arg, ctx: CustomContext) => {
    // The parent object is a Prisma ScheduledClass, which has an `id` field.
    const t = await ctx.db.booking.findMany({
      where: { scheduledClassId: parent.id },
    });

    return [];
  },

  // Fetches the Gym associated with this class via its ClassTemplate.
  // NOTE: This also has the N+1 query problem.
  gym: async (parent, _arg, ctx: CustomContext) => {
    const template = await ctx.db.classTemplate.findUniqueOrThrow({
      where: { id: parent.classTemplateId },
      include: { gym: true },
    });

    return template.gym;
  },

  // Fetches the Staff instructor associated with this class via its ClassTemplate.
  // NOTE: This also has the N+1 query problem.
  instructor: async (parent, _arg, ctx: CustomContext) => {
    const template = await ctx.db.classTemplate.findUnique({
      where: { id: parent.classTemplateId },
      select: { instructor: true },
    });
    return template?.instructor;
  },
};
