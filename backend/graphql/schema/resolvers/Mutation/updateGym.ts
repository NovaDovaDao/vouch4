import { createGraphQLError } from "npm:graphql-yoga";
import { CustomContext } from "../../../server.ts";
import type { MutationResolvers } from "./../../types.generated.ts";
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
      legalDocsUrl: arg.data.legalDocsUrl,
      legalEntityName: arg.data.legalEntityName,
      name: arg.data.name ?? "",
    },
    where: {
      id: arg.id,
      tenancyId: ctx.user.tenancyId,
    },
  });
};
