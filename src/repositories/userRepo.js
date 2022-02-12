import UserModel from '../models/user.js'
import { postgres } from '../repositories/base.js'

export default class UserRepo {
  constructor(user) {
    this.strategy = postgres
    this.table = 'users'
    this.user = user
  }

  static async all(){
    const repo = new UserRepo()

    return await repo.strategy.read({table: repo.table})
  }

  static async save(user){
    const repo = new UserRepo()
    const result = await repo.strategy.create({ user, table: repo.table })

    return new UserModel({ ...user, ...result })
  }

  static async delete(user) {
    const repo = new UserRepo()

    return await repo.strategy.delete({ table: repo.table, query: user })
  }

  static async deleteAll() {
    const repo = new UserRepo()

    return await repo.strategy.delete({ table: repo.table, query: null })
  }

}
