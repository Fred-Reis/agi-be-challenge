import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-company-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const companiesRepository = new PrismaCompaniesRepository()
  const registerUseCase = new RegisterUseCase(
    usersRepository,
    companiesRepository,
  )

  return registerUseCase
}
