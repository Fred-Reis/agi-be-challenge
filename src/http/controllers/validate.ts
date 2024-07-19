import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeValidateUseCase } from '@/use-cases/factories/make-validate-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validatecateBodySchema = z.object({
    token: z.string(),
  })

  const { token } = validatecateBodySchema.parse(request.body)

  try {
    const validateUseCase = makeValidateUseCase()

    await validateUseCase.execute({
      token,
    })
  } catch (error) {
    reply.status(400).send()
    throw error
  }

  return reply.status(201).send()
}
