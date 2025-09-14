import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { MutationResolvers } from "./../../types.generated.js";
export const createProduct: NonNullable<
  MutationResolvers["createProduct"]
> = async (_parent, arg, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  return ctx.db.product.create({
    data: {
      name: arg.input.name,
      rules: arg.input.rules,
      active: true,
      meta: {
        description: arg.input.description,
        isNft: arg.input.isNft,
        contractAddress: arg.input.contractAddress,
      },
      tenancyId: ctx.user.tenancyId,
    },
  });
};
