import { app } from '../../app.js'
import req from 'supertest'

import UserRepo from '../../repositories/userRepo.js'
import PGStrategy from '../../strategies/postgres.js'

let strategy;
describe('#POST /users', () => {
  beforeAll(async() => {
    strategy = new PGStrategy()
  })

  beforeEach(async () => await UserRepo.deleteAll(strategy))

  it('saves a user with valid params', async () => {
    const user = {
      name: 'Some name',
      email: 'valid@email.com',
      age: '26'
    }
    const result = await req(app)
      .post('/users')
      .send({ user })

    expect(result.status).toEqual(200)
    expect(result.body).toMatchObject(user)
    expect(await UserRepo.all(strategy)).toHaveLength(1)
  })

  it('returns 400 if invalid params', async () => {
    const user = {
      name: null,
      email: null,
      age: '26'
    }
    const result = await req(app)
      .post('/users')
      .send({ user })

    expect(result.status).toEqual(400)
    expect(result.body).toMatchObject([
      { email: 'cant be blank' }
    ])
    expect(await UserRepo.all(strategy)).toHaveLength(0)
  })
})
