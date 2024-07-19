import { Prisma, Public_Provider } from '@prisma/client'

export interface PublicProvidersRepository {
  getAll(): Promise<Public_Provider[] | null>
  findByName(name: string): Promise<Public_Provider | null>
  create(data: Prisma.Public_ProviderCreateInput): Promise<Public_Provider>
}
