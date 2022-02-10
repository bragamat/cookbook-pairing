import { postgres } from '../repositories/base.js'

export default class UserRepo {
  constructor(strategy = postgres, user) {
    this.strategy = strategy
    this.table = 'users'
    this.user = user
  }

  async create(user) {
    return await this.strategy.create({ user, table: this.table })
  }

  async delete(query) {
    try{
      return await this.strategy.delete({ table: this.table, query })
    } catch(err){
    }
  }

  async select(query = "*"){
    return await this.strategy.read({ table: this.table, query })
  }

  static async save(user, strategy){
    const repo = new UserRepo(strategy)

    try {
      return await repo.create(user)
    } catch (err) {
      throw new Error(JSON.stringify(err))
    }
  }

  static async delete(query, strategy) {
    const repo = new UserRepo(strategy)

    try {
      return await repo.delete(query)
    } catch (err) {
      throw new Error(JSON.stringify(err))
    }
  }

  static async deleteAll(strategy) {
    const repo = new UserRepo(strategy)
    strategy.connect()

    try {
      return await repo.delete()
    } catch (err) {
      throw new Error(JSON.stringify(err))
    }
  }

  static async all(strategy){
    const repo = new UserRepo(strategy)
    strategy.connect()

    try {
      return await repo.select()
    } catch (err) {
      throw new Error(JSON.stringify(err))
    }
  }
}
