import UserFactory from '../../factories/userFactory.js'
import UserRepo from '../../repositories/userRepo.js'
import PGStrategy from '../../strategies/postgres.js'

let strategy;
describe('UserFactory', () => {
  beforeAll(async () => {
    strategy = new PGStrategy()
    await UserRepo.deleteAll(strategy)
  })

  it('saves user to database', async () => {
    const user = {
      name: 'Mateus Braga',
      age: 26,
      email: 'mateus@braga.com'
    }

    const userFactory = new UserFactory(user, UserRepo)

    expect(await userFactory.save()).toMatchObject(user)
    expect(await UserRepo.all(strategy)).toHaveLength(1)
  })
})
