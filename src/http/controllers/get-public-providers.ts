import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetPublicProvidersUseCase } from '@/use-cases/factories/make-get-public-providers-use-case'

export async function getPublicProviders(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPublicProvidersUseCase = makeGetPublicProvidersUseCase()

  const { providers } = await getPublicProvidersUseCase.execute()

  if (!providers) {
    return reply.status(400).send({
      message: 'Providers not found',
    })
  }

  return reply.status(201).send({ providers })
}
