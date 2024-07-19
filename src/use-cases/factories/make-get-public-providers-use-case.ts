import { PrismaPublicProvidersRepository } from '@/repositories/prisma/prisma-public-providers-repository'
import { GetPublicProviderUseCase } from '../get-public-providers'

export function makeGetPublicProvidersUseCase() {
  const publicProvidersRepository = new PrismaPublicProvidersRepository()
  const getPublicProvidersUseCase = new GetPublicProviderUseCase(
    publicProvidersRepository,
  )

  return getPublicProvidersUseCase
}
