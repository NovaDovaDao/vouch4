import { createGraphQLError } from "graphql-yoga";
import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "./../../types.generated.js";
export const updateGym: NonNullable<MutationResolvers["updateGym"]> = (
  _parent,
  arg,
  ctx: CustomContext
) => {
  if (!ctx.user?.tenancyId)
    throw createGraphQLError("Gym must be associated to a tenant");

  return ctx.db.gym.update({
    data: {
      address: arg.data.address ?? "",
      legalDocsUrl: arg.data.legalDocsUrl ?? null,
      legalEntityName: arg.data.legalEntityName ?? null,
      name: arg.data.name ?? "",
    },
    where: {
      id: arg.id,
      tenancyId: ctx.user.tenancyId,
    },
  });
};
