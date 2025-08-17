import { createGraphQLError } from "graphql-yoga";
import { CustomContext } from "../../../server.ts";
import type { MutationResolvers } from "./../../types.generated.ts";

export const createGym: NonNullable<MutationResolvers['createGym']> = (
  _parent,
  arg,
  ctx: CustomContext
) => {
  if (!ctx.user?.tenancyId)
    throw createGraphQLError("Gyms need to be associated to a tenant");
  return ctx.db.gym.create({
    data: {
      ...arg.data,
      tenancyId: ctx.user.tenancyId,
    },
  });
};
