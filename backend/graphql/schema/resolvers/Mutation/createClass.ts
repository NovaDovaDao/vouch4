import { createGraphQLError } from "graphql-yoga";
import { CustomContext } from "../../../server.ts";
import type { MutationResolvers } from "../../types.generated.ts";
export const createClass: NonNullable<MutationResolvers['createClass']> = (
  _parent,
  arg,
  ctx: CustomContext
) => {
  if (!ctx.user?.tenancyId)
    throw createGraphQLError("Woops, classes need to be associated to tenant.");

  return ctx.db.class.create({
    data: arg.data,
  });
};
