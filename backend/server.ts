import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "./graphql/schema/typeDefs.generated.ts";
import { resolvers } from "./graphql/schema/resolvers.generated.ts";

export const yogaServer = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});
