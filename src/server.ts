import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'
import { env } from './env'

const app = fastify()

app.post('/', async () => {
  const createUser = await knex('users')
    .insert({
      id: crypto.randomUUID(),
      name: 'Marlon Moraes',
      email: 'marlon@email.com',
      password: '123456',
    })
    .returning('*')

  return createUser
})

app.get('/list', async () => {
  const listUsers = await knex('users').select('*')

  return listUsers
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running`)
  })
