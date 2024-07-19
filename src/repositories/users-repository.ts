import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findByToken(token: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  confirmEmail(userId: string): Promise<void>
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
}
