import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "./../../types.generated.js";
export const updateClass: NonNullable<MutationResolvers["updateClass"]> = (
  _parent,
  arg,
  ctx: CustomContext
) => {
  return ctx.db.class.update({
    data: {
      capacity: arg.data.capacity ?? 0,
      description: arg.data.description ?? null,
      gymId: arg.data.gymId ?? "",
      instructorId: arg.data.instructorId ?? null,
      name: arg.data.name ?? "",
    },
    where: {
      id: arg.id,
    },
  });
};
