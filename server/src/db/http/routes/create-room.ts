import { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from "zod/v4"
import { db } from "../../connection.ts"
import { schema } from "../../schema/index.ts"
import { desc, name } from "drizzle-orm"

export const createRoomRoute: FastifyPluginCallbackZod = (app) => {
    app.post("/rooms", {
        schema: {
            body: z.object({
                name: z.string().min(1),
                description: z.string().optional(),
            })
        }
    },
        async ({ body }, reply) => {
            const { name, description } = body

            const result = await db.insert(schema.rooms).values({
                name,
                description
            }).returning()

            const insertedRoom = result[0]

            if (!insertedRoom) {
                return reply.status(500).send({ error: "Failed to create room" })
            }

            return reply.status(201).send({ roomId: insertedRoom.id })
        })
}
