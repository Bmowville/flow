import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";


const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const localSchemaPath = resolve(root, "prisma/schema.prisma");
const postgresSchemaPath = resolve(root, "prisma/postgres/schema.prisma");


function readSchema(path) {
  return readFileSync(path, "utf8").replaceAll("\r\n", "\n");
}


function modelDefinitions(schema) {
  const firstModelIndex = schema.search(/^model\s+/m);
  if (firstModelIndex === -1) {
    throw new Error("No Prisma model definitions found");
  }

  return schema
    .slice(firstModelIndex)
    .trim()
    .replace(/\n{3,}/g, "\n\n");
}


const localModels = modelDefinitions(readSchema(localSchemaPath));
const postgresModels = modelDefinitions(readSchema(postgresSchemaPath));

if (localModels !== postgresModels) {
  console.error("Local SQLite and production Postgres Prisma model definitions differ.");
  console.error("Update both schema files before merging changes.");
  process.exit(1);
}

console.log("Prisma model definitions match across local and production schemas.");