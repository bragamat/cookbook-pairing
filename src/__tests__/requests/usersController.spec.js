import { app } from '../../app.js'
import req from 'supertest'

import UserRepo from '../../repositories/userRepo.js'
import PGStrategy from '../../strategies/postgres.js'

let strategy;
describe('#POST /users', () => {
  beforeAll(async () => {
    strategy = new PGStrategy()
    await UserRepo.deleteAll(strategy)
  })
  it('saves a user with proper params', async () => {
    const user = {
      name: 'Some name',
      email: 'valid@email.com',
      age: '26'
    }
    const result = await req(app)
      .post('/users')
      .send({ user })

    expect(await UserRepo.all(strategy)).toHaveLength(1)
    expect(result.status).toEqual(200)
    expect(result.body).toMatchObject(user)
  })
})
