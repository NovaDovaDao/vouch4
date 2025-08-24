import { createGraphQLError } from "graphql-yoga";
import type { MutationResolvers } from "./../../types.generated.js";

export const updateMember: NonNullable<
  MutationResolvers["updateMember"]
> = async (_parent, _arg, _ctx) => {
  throw createGraphQLError("Not implemented yet");
};
