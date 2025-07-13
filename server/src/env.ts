import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(8080),
    DATABASE_URL: z.string().url().startsWith("postgresql://"),
    GOOGLE_API_KEY: z.string().min(1, "GOOGLE_API_KEY is required"),
})

export const env = envSchema.parse(process.env);