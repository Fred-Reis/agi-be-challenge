import { Public_Provider } from '@prisma/client'

import { PublicProvidersRepository } from '@/repositories/public-providers-repository'

import { PublicProviderAlreadyExistsError } from './errors/public-provider-already-exists-error'

interface AddPublicProviderUseCaseRequest {
  name: string
}

interface AddPublicProviderUseCaseResponse {
  provider: Public_Provider
}

export class AddPublicProviderUseCase {
  constructor(private publicProvidersRepository: PublicProvidersRepository) {}

  async execute({
    name,
  }: AddPublicProviderUseCaseRequest): Promise<AddPublicProviderUseCaseResponse> {
    const doesProviderExists =
      await this.publicProvidersRepository.findByName(name)

    if (doesProviderExists) {
      throw new PublicProviderAlreadyExistsError()
    }

    const provider = await this.publicProvidersRepository.create({
      name,
    })

    return {
      provider,
    }
  }
}
