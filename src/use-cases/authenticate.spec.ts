import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialError } from './errors/invalid-credential-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      email: 'a@ssa.com',
      full_name: 'a',
      password_hash: await hash('123456', 6),
      phone_number: '123456',
      role: 'user',
      from_where: 'a',
      company_id: '1',
    })

    const { user } = await sut.execute({
      email: 'a@ssa.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'a@ssa.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      email: 'a@ssa.com',
      full_name: 'a',
      password_hash: await hash('123456', 6),
      phone_number: '123456',
      role: 'user',
      from_where: 'a',
      company_id: '1',
    })

    await expect(() =>
      sut.execute({
        email: 'a@ssa.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
