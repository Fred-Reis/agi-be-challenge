import { Public_Provider } from '@prisma/client'

import { PublicProvidersRepository } from '@/repositories/public-providers-repository'

interface GetPublicProviderUseCaseResponse {
  providers: Public_Provider[] | null
}

export class GetPublicProviderUseCase {
  constructor(private publicProvidersRepository: PublicProvidersRepository) {}

  async execute(): Promise<GetPublicProviderUseCaseResponse> {
    const providers = await this.publicProvidersRepository.getAll()

    return {
      providers,
    }
  }
}
