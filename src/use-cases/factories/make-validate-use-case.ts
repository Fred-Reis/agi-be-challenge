import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { ValidateUseCase } from '../validate'

export function makeValidateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const validateUseCase = new ValidateUseCase(usersRepository)

  return validateUseCase
}
