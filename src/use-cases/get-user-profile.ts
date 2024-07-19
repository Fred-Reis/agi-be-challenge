import { Company, User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'
import { CompaniesRepository } from '@/repositories/companies-repository'
import { UserNotFoundError } from './errors/user-not-found-error'
import { CompanyNotFoundError } from './errors/company-not-found-error'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
  company: Company
}

export class GetUserProfileUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private companiesRepository: CompaniesRepository,
  ) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const company = await this.companiesRepository.findById(user?.company_id)

    if (!company) {
      throw new CompanyNotFoundError()
    }
    return {
      user,
      company,
    }
  }
}
