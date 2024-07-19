import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { CompaniesRepository } from '../companies-repository'

export class PrismaCompaniesRepository implements CompaniesRepository {
  async findByName(name: string) {
    const company = await prisma.company.findFirst({
      where: {
        company_name: name,
      },
    })
    return company
  }

  async findById(id: string) {
    const company = await prisma.company.findFirst({
      where: {
        id,
      },
    })
    return company
  }

  async create(data: Prisma.CompanyCreateInput) {
    const company = await prisma.company.create({ data })

    return company
  }
}
