import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-company-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const companiesRepository = new PrismaCompaniesRepository()
  const registerUseCase = new GetUserProfileUseCase(
    usersRepository,
    companiesRepository,
  )

  return registerUseCase
}
