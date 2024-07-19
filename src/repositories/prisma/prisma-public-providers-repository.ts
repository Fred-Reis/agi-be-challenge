import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { PublicProvidersRepository } from '../public-providers-repository'

export class PrismaPublicProvidersRepository
  implements PublicProvidersRepository
{
  async getAll() {
    const providers = await prisma.public_Provider.findMany()

    return providers
  }

  async findByName(name: string) {
    const provider = await prisma.public_Provider.findFirst({
      where: {
        name,
      },
    })

    return provider
  }

  async create(data: Prisma.Public_ProviderCreateInput) {
    const user = await prisma.public_Provider.create({ data })

    return user
  }
}
