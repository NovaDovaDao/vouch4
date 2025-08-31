import type { MutationResolvers } from "./../../types.generated.js";
import { errors } from "../../../errors.js";

export const updateMember: NonNullable<
  MutationResolvers["updateMember"]
> = async (_parent, _arg, _ctx) => {
  throw errors.notImplemented();
};
