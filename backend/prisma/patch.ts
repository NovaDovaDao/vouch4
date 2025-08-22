const clientPath = "./prisma/generated/client.ts";
const fileContent = await Deno.readTextFile(clientPath);
const newContent = fileContent.replace(
  '@prisma/client/runtime/library"',
  'npm:@prisma/client/runtime/library"'
);
await Deno.writeTextFile(clientPath, newContent);

console.log("Prisma client generated and import path corrected successfully!");
