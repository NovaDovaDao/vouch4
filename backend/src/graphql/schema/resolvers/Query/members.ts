import { createGraphQLError } from "graphql-yoga";
import type { CustomContext } from "../../../../server.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const members: NonNullable<QueryResolvers['members']> = async (
  _parent,
  _arg,
  ctx: CustomContext
) => {
  if (!ctx.user?.tenancyId)
    throw createGraphQLError("Wow, you need a tenant first!");

  return ctx.db.user.findMany({
    where: { tenancyId: ctx.user?.tenancyId, category: "MEMBER" },
  });
};
