import { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from "zod/v4"

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
    app.post("/rooms/:roomId/audio", {
        schema: {
            params: z.object({
                roomId: z.string()
            }),
        }
    },
        async ({ params, file }, reply) => {
            const { roomId } = params
            const audio = await file()

            if (!audio) {
                throw new Error("No audio file provided")
            }

            return reply.status(201)
        })
}
