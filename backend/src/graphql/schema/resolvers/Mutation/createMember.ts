import { createGraphQLError } from "graphql-yoga";
import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "./../../types.generated.js";
export const createMember: NonNullable<
  MutationResolvers["createMember"]
> = async (_parent, _arg, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId)
    throw createGraphQLError("Wow, you need a tenant first!");

  throw createGraphQLError("Not implemented yet");
};
