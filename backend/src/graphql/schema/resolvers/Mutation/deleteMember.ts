import { createGraphQLError } from "graphql-yoga";
import type { MutationResolvers } from "./../../types.generated.js";
export const deleteMember: NonNullable<
  MutationResolvers["deleteMember"]
> = async (_parent, _arg, _ctx) => {
  throw createGraphQLError("Not implemented yet");
};
