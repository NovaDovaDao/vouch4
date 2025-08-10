import { serve } from "https://deno.land/std@0.157.0/http/server.ts";
import { auth } from "./auth.ts";
import { yogaServer } from "./server.ts";

const handler = (request: Request) => {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/api/auth")) {
    return auth.handler(request);
  }

  return yogaServer(request);
};

if (import.meta.main) {
  serve(handler, {
    onListen({ hostname, port }) {
      console.log(`Listening on http://${hostname}:${port}/`);
      console.log(
        `GraphQL endpoint: http://${hostname}:${port}${yogaServer.graphqlEndpoint}`
      );
    },
  });
}
