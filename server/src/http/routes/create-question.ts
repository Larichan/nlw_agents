import { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from "zod/v4"
import { db } from "../../db/connection.ts"
import { schema } from "../../db/schema/index.ts"

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
    app.post("/rooms/:roomId/questions", {
        schema: {
            body: z.object({
                question: z.string().min(1),
            }),
            params: z.object({
                roomId: z.string()
            }),
        }
    },
        async ({ body, params }, reply) => {
            const { question } = body
            const { roomId } = params

            const result = await db.insert(schema.questions).values({
                roomId,
                question
            }).returning()

            const insertedQuestion = result[0]

            if (!insertedQuestion) {
                return reply.status(500).send({ error: "Failed to create a question" })
            }

            return reply.status(201).send({ questionId: insertedQuestion.id })
        })
}
