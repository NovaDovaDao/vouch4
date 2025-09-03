import { errors } from "../../../errors.js";
import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "./../../types.generated.js";

export const createGym: NonNullable<MutationResolvers['createGym']> = (
  _parent,
  arg,
  ctx: CustomContext,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();
  return ctx.db.gym.create({
    data: {
      address: arg.data.address,
      name: arg.data.name,
      legalDocsUrl: arg.data.legalDocsUrl ?? null,
      legalEntityName: arg.data.legalEntityName ?? null,
      tenancyId: ctx.user.tenancyId,
    },
  });
};
