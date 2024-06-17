import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

export async function routes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    })

    const { name, email, password } = createUserBodySchema.parse(request.body)

    let userId = request.cookies.userId

    if (!userId) {
      userId = randomUUID()
      reply.cookie('userId', userId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password,
      user_id: userId,
    })

    return reply.status(201).send(201)
  })

  app.get('/', async () => {
    const listUsers = await knex('users').select('*')

    return listUsers
  })

  app.post('/meals', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      diet: z.boolean(),
    })

    const { name, description, diet } = createUserBodySchema.parse(request.body)

    const userId = request.cookies.userId

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      diet,
      user_id: userId,
    })

    return reply.status(201).send(201)
  })

  // listar todas as refeições

  app.get('/meals', async () => {
    const listMeals = await knex('meals').select('*')

    return listMeals
  })

  // listar todas as refeições de um usuario

  app.get('/:id', async (request) => {
    const getMealsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getMealsParamsSchema.parse(request.params)

    const listMeals = await knex('meals').where('user_id', id)

    return { listMeals }
  })
}
