import { fastify } from 'fastify'
import { fastifyMultipart } from '@fastify/multipart'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { fastifyCors } from '@fastify/cors'
import { env } from './env.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomQuestionsRoute } from './http/routes/get-room-questions.ts'
import { createQuestionRoute } from './http/routes/create-question.ts'
import { uploadAudioRoute } from './http/routes/upload-audio.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: "http://localhost:5173"
})

app.register(fastifyMultipart, {
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    }
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
app.register(uploadAudioRoute)

app.listen({ port: env.PORT }).then(() => {
    console.log(`Server is running on http://localhost:${env.PORT}`)
})