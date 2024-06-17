import fastify from 'fastify'
import { env } from './env'
import { routes } from './routes/routes'
import cookie from '@fastify/cookie'

const app = fastify()
app.register(cookie)
app.register(routes, {
  prefix: 'user',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running`)
  })
