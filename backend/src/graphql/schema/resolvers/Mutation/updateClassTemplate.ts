import { errors } from "../../../errors.js";
import type { CustomContext } from "../../../../server.js";
import type { MutationResolvers } from "./../../types.generated.js";

export const updateClassTemplate: NonNullable<MutationResolvers['updateClassTemplate']> = async (_parent, _args, ctx: CustomContext) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  throw errors.notImplemented();
};
