import { jest } from "@jest/globals"
import UserFixture from '../support/fixtures/validUser.js'
import UserModel from '../../models/user.js';
import UserRepo from '../../repositories/userRepo.js'

import { postgres } from '../../repositories/base.js'

describe('UserRepository', () => {
  beforeAll(async () => {
    await UserRepo.deleteAll()
  })

  it('triggers db delete', async () => {
    jest.spyOn(postgres, postgres.delete.name)

    const user = await UserFixture.create()
    await UserRepo.delete(user)

    expect(await UserRepo.all()).toHaveLength(0)
    expect(postgres.delete).toHaveBeenCalledTimes(1)
    expect(postgres.delete).toHaveBeenCalledWith({
      table: 'users',
      query: user
    })
  })

  it('triggers db insert', async () => {
    await UserFixture.create()

    const params = {
      name: 'Mateus Braga',
      age: 26,
      email: 'mateus@braga.com'
    }

    const user = new UserModel(params)
    const userRepo = await UserRepo.save(user)

    expect(userRepo).toMatchObject(params)
    expect(userRepo).toBeInstanceOf(UserModel)

    expect(await UserRepo.all()).toHaveLength(2)
  })
})
