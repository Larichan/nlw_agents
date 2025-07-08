import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "./schema/index.ts";
import { env } from "../env.ts";

export const client = postgres(env.DATABASE_URL)
export const db = drizzle(client, {
    schema,
    casing: "snake_case"
})