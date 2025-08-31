import {
  createSchema,
  createYoga,
  type YogaInitialContext,
} from "graphql-yoga";
import { errors } from "./graphql/errors.js";
import type { ParameterizedContext } from "koa";
import { typeDefs } from "./graphql/schema/typeDefs.generated.js";
import { resolvers } from "./graphql/schema/resolvers.generated.js";
import { db } from "./db.js";
import { auth, type AuthUser } from "./auth.js";
import { verifyJWT } from "./jwt.js";

export interface CustomContext extends YogaInitialContext {
  db: typeof db;
  user?: AuthUser;
  isInternal: boolean;
}

export const yogaServer = createYoga<ParameterizedContext>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }) as any,
  logging: "debug",
  context: async ({ request, params }) => {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      const internalAccessToken = await verifyJWT(
        request.headers.get("authorization")?.split("bearer").at(1)?.trim() ??
          "",
      );
      if (!internalAccessToken) throw errors.notAuthenticated();
    }

    return {
      db,
      user: session?.user,
      isInternal: !session?.user,
      request,
      params,
    };
  },
});
