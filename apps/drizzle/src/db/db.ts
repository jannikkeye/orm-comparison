import * as schema from "./schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { DATABASE_URL } from "../env";

export const queryClient = postgres(DATABASE_URL);

export const db = drizzle(queryClient, {
  schema,
});
