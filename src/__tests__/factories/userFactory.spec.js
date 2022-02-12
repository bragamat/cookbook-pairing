import UserFactory from '../../factories/userFactory.js'
import UserModel from '../../models/user.js';
import UserRepo from '../../repositories/userRepo.js'
import PGStrategy from '../../strategies/postgres.js'

describe('UserFactory', () => {
  beforeAll(async () => {
    await UserRepo.deleteAll()
  })

  it('saves user to database', async () => {
    const params = {
      name: 'Mateus Braga',
      age: 26,
      email: 'mateus@braga.com'
    }

    const userFactory = await UserFactory.save(params)

    expect(userFactory).toMatchObject(params)
    expect(userFactory).toBeInstanceOf(UserModel)
    expect(await UserRepo.all()).toHaveLength(1)
  })
})
