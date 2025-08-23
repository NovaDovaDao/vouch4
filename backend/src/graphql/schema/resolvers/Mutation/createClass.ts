import { createGraphQLError } from "graphql-yoga";
import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "../../types.generated.js";
export const createClass: NonNullable<MutationResolvers["createClass"]> = (
  _parent,
  arg,
  ctx: CustomContext
) => {
  if (!ctx.user?.tenancyId)
    throw createGraphQLError("Woops, classes need to be associated to tenant.");

  return ctx.db.class.create({
    data: {
      capacity: arg.data.capacity,
      name: arg.data.name,
      scheduleDateTime: arg.data.scheduleDateTime,
      gymId: arg.data.gymId,
      instructorId: arg.data.instructorId ?? null,
    },
  });
};
