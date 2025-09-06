import type { ClassTemplateResolvers } from "./../types.generated.js";
export const ClassTemplate: ClassTemplateResolvers = {
  gym: (parent, _arg, ctx) => {
    return ctx.db.gym.findUniqueOrThrow({
      where: { id: parent.gym.id },
    });
  },
  instructor: (parent, _arg, ctx) => {
    if (!parent.instructor) return null;
    return ctx.db.user.findUnique({
      where: { id: parent.instructor.id },
    });
  },
};
