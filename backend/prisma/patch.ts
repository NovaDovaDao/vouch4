import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts";

const clientDirectory = "./prisma/generated/";

for await (const entry of walk(clientDirectory, {
  exts: [".ts", ".js", ".d.ts"],
})) {
  if (entry.isFile) {
    const fileContent = await Deno.readTextFile(entry.path);

    const newContent = fileContent.replace(
      /@prisma\/client\/runtime\/library/g,
      "npm:@prisma/client/runtime/library"
    );

    if (fileContent !== newContent) {
      await Deno.writeTextFile(entry.path, newContent);
      console.log(`✅ Corrected import path in: ${entry.path}`);
    }
  }
}

console.log("All Prisma client files have been processed.");
