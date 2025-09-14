import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { MutationResolvers } from "./../../types.generated.js";
export const updateProduct: NonNullable<
  MutationResolvers["updateProduct"]
> = async (_parent, _arg, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  throw errors.notImplemented();
};
