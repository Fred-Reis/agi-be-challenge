import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByToken(token: string) {
    const user = this.items.find((item) => item.validation_id === token)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async confirmEmail(userId: string) {
    const user = this.items.find((item) => item.id === userId)

    if (!user) {
      return
    }

    user.checked_at = new Date()
    user.validation_id = null
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = {
      id: '1',
      email: data.email,
      full_name: data.full_name,
      password_hash: data.password_hash,
      phone_number: data.phone_number,
      role: data.role,
      from_where: data.from_where,
      checked_at: new Date(),
      validation_id: 'asdsd',
      company_id: '1',
    }

    this.items.push(user)

    return user
  }
}
