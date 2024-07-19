import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async findByToken(token: string) {
    const user = await prisma.user.findUnique({
      where: {
        validation_id: token,
      },
    })
    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async confirmEmail(userId: string) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        checked_at: new Date(),
        validation_id: null,
      },
    })
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }
}
