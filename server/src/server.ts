import { fastify } from 'fastify'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { fastifyCors } from '@fastify/cors'
import { env } from './env.ts'
import { getRoomsRoute } from './db/http/routes/get-rooms.ts'
import { createRoomRoute } from './db/http/routes/create-room.ts'
import { getRoomQuestionsRoute } from './db/http/routes/get-room-questions.ts'
import { createQuestionRoute } from './db/http/routes/create-question.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: "http://localhost:5173"
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.get("/health", () => {
    return "OK!"
})

app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomQuestionsRoute)
app.register(createQuestionRoute)

app.listen({ port: env.PORT }).then(() => {
    console.log(`Server is running on http://localhost:${env.PORT}`)
})