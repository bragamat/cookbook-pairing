import UserFactory from '../../factories/userFactory.js'
import UserModel from '../../models/user.js';
import UserRepo from '../../repositories/userRepo.js'
import PGStrategy from '../../strategies/postgres.js'

let strategy;
describe('UserRepository', () => {
  beforeAll(async () => {
    strategy = new PGStrategy()
    await UserRepo.deleteAll(strategy)
  })

  it('triggers db insert', async () => {
    const params = {
      name: 'Mateus Braga',
      age: 26,
      email: 'mateus@braga.com'
    }

    const user = new UserModel(params)

    const userRepo = new UserRepo(user)

    const userFactory = await UserFactory.save(params)

    expect(userFactory).toMatchObject(params)
    expect(userFactory).toBeInstanceOf(UserModel)
    expect(await UserRepo.all(strategy)).toHaveLength(1)
  })
})
