import { Prisma, Company } from '@prisma/client'
import { CompaniesRepository } from '../companies-repository'

export class InMemoryCompaniesRepository implements CompaniesRepository {
  public items: Company[] = []

  async findByName(name: string) {
    const company = this.items.find((item) => item.company_name === name)

    if (!company) {
      return null
    }

    return company
  }

  async findById(id: string) {
    const company = this.items.find((item) => item.id === id)

    if (!company) {
      return null
    }

    return company
  }

  async create(data: Prisma.CompanyCreateInput) {
    const company = {
      id: '1',
      company_name: data.company_name,
      company_field: data.company_field,
      company_size: data.company_size,
      department: data.department,
      created_at: new Date(),
      url: data.url,
      color: data.color,
    }

    this.items.push(company)

    return company
  }
}
