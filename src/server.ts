import fastify from 'fastify'
import { env } from './env'
import { routes } from './routes/routes'

const app = fastify()

app.register(routes)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running`)
  })
