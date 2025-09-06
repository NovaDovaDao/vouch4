import type { CustomContext } from "../../../../server.js";
import { errors } from "../../../errors.js";
import type { QueryResolvers } from "./../../types.generated.js";

export const bookings: NonNullable<QueryResolvers["bookings"]> = async (
  _parent,
  _args,
  ctx: CustomContext,
) => {
  if (!ctx.user?.tenancyId) throw errors.missingTenant();

  throw errors.notImplemented();
};
