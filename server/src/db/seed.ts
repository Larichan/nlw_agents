import { reset, seed } from "drizzle-seed"
import { client, db } from "./connection.ts"
import { schema } from "./schema/index.ts"

await reset(db, schema)

await seed(db, schema).refine(faker => {
    return {
        rooms: {
            count: 10,
            columns: {
                name: faker.jobTitle(),
                description: faker.loremIpsum(),
            }
        },
        questions: {
            count: 5,
        }
    }
})

await client.end()