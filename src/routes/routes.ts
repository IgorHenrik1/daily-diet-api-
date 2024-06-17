import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import crypto from 'node:crypto'

export async function routes(app: FastifyInstance) {
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
}
