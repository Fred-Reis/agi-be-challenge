import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { InMemoryCompaniesRepository } from '@/repositories/in-memory/in-memory-companies-repository'

let usersRepository: InMemoryUsersRepository
let companiesRepository: InMemoryCompaniesRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    companiesRepository = new InMemoryCompaniesRepository()
    sut = new RegisterUseCase(usersRepository, companiesRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      email: 'a@ssa.com',
      fullName: 'a',
      password: '123456',
      phoneNumber: '123456',
      role: 'user',
      fromWhere: 'a',
      companyName: 'asds',
      companyField: 'asdsa',
      companySize: 'asdsa',
      department: 'asdsa',
      url: 'asdsa',
      color: 'asdsa',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'a@ssa.com',
      fullName: 'a',
      password: '123456',
      phoneNumber: '123456',
      role: 'user',
      fromWhere: 'a',
      companyName: 'asds',
      companyField: 'asdsa',
      companySize: 'asdsa',
      department: 'asdsa',
      url: 'asdsa',
      color: 'asdsa',
    })

    const isPasswordHashedProperly = await compare('123456', user.password_hash)

    expect(isPasswordHashedProperly).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      email,
      fullName: 'a',
      password: '123456',
      phoneNumber: '123456',
      role: 'user',
      fromWhere: 'a',
      companyName: 'asds',
      companyField: 'asdsa',
      companySize: 'asdsa',
      department: 'asdsa',
      url: 'asdsa',
      color: 'asdsa',
    })

    await expect(() =>
      sut.execute({
        email,
        fullName: 'a',
        password: '123456',
        phoneNumber: '123456',
        role: 'user',
        fromWhere: 'a',
        companyName: 'asds',
        companyField: 'asdsa',
        companySize: 'asdsa',
        department: 'asdsa',
        url: 'asdsa',
        color: 'asdsa',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
