import type { CodegenConfig } from "npm:@graphql-codegen/cli";
import { defineConfig } from "npm:@eddeee888/gcg-typescript-resolver-files";

const config: CodegenConfig = {
  schema: "**/schema.graphql",
  generates: {
    "graphql/schema": defineConfig(),
  },
};
export default config;
