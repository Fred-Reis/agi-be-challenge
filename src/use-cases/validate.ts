import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'
import { error } from 'console'

interface ValidateUseCaseRequest {
  token: string
}

interface ValidateUseCaseResponse {
  user: User
}

export class ValidateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    token,
  }: ValidateUseCaseRequest): Promise<ValidateUseCaseResponse> {
    const user = await this.usersRepository.findByToken(token)

    if (!user) {
      throw error
    }

    await this.usersRepository.confirmEmail(user.id)

    return {
      user,
    }
  }
}
