import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      fullName: 'John Doe',
      email: 'johndoo@example.com',
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

    expect(response.statusCode).toEqual(201)
  })
})
