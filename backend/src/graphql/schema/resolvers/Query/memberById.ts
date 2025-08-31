import { createGraphQLError } from "graphql-yoga";
import type { CustomContext } from "../../../../server.js";
import type { QueryResolvers } from "./../../types.generated.js";
export const memberById: NonNullable<QueryResolvers['memberById']> = async (
  _parent,
  arg,
  ctx: CustomContext
) => {
  if (!ctx.user?.tenancyId)
    throw createGraphQLError("Wow, you need a tenant first!");

  return ctx.db.user.findFirstOrThrow({
    where: { tenancyId: ctx.user?.tenancyId, category: "MEMBER", id: arg.id },
  });
};
