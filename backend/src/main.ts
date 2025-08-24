import Koa from "koa";
import { toNodeHandler } from "better-auth/node";
import { yogaServer } from "./server.js";
import { auth } from "./auth.js";
import "dotenv/config";

const app = new Koa();

// Authentication middleware for /api/auth
app.use(async (ctx, next) => {
  if (ctx.path.startsWith("/api/auth")) {
    await toNodeHandler(auth)(ctx.req, ctx.res);
  } else {
    // If not an auth route, continue to the next middleware
    await next();
  }
});

// Bind GraphQL Yoga to `/graphql` endpoint
app.use(async (ctx) => {
  // Second parameter adds Koa's context into GraphQL Context
  // If you use any body parsing middleware in your application,
  // Make sure it is `ctx.request` and not `ctx.req`
  const response = await yogaServer.handleNodeRequestAndResponse(
    ctx.request,
    ctx.res,
    ctx
  );

  // Set status code
  ctx.status = response.status;

  // Set headers
  response.headers.forEach((value, key) => {
    ctx.append(key, value);
  });

  // Converts ReadableStream to a NodeJS Stream
  ctx.body = response.body;
});

app.listen(4000, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:4000/${yogaServer.graphqlEndpoint}`
  );
});
