import { Company, Prisma } from '@prisma/client'

export interface CompaniesRepository {
  findByName(name: string): Promise<Company | null>
  findById(id: string): Promise<Company | null>
  create(data: Prisma.CompanyCreateInput): Promise<Company>
}
