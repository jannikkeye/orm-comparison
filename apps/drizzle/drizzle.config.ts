import { defineConfig } from "drizzle-kit";

const config = defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "postgres://postgres:postgres@localhost:5432/drizzle",
  },
});

export default config;
