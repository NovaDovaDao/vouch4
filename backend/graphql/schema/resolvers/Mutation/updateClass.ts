import { CustomContext } from "../../../server.ts";
import type { MutationResolvers } from "./../../types.generated.ts";
export const updateClass: NonNullable<MutationResolvers["updateClass"]> = (
  _parent,
  arg,
  ctx: CustomContext
) => {
  return ctx.db.class.update({
    data: {
      capacity: arg.data.capacity ?? 0,
      description: arg.data.description,
      gymId: arg.data.gymId ?? "",
      instructorId: arg.data.instructorId,
      name: arg.data.name ?? "",
    },
    where: {
      id: arg.id,
    },
  });
};
