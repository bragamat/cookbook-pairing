import UserModel from '../models/user.js'
import { postgres } from '../repositories/base.js'

export default class UserRepo {
  constructor(user) {
    this.strategy = postgres
    this.table = 'users'
    this.user = user
  }

  async delete(query) {
    try{
      return await this.strategy.delete({ table: this.table, query })
    } catch(err){
      console.log('err => ', err)
      throw new Error(err)
    }
  }

  async select(query = "*"){
    return await this.strategy.read({ table: this.table, query })
  }

  static async save(user){
    const repo = new UserRepo()

    try {
      const result = await repo.strategy.create({ user, table: repo.table })

      return new UserModel({ ...user, ...result })
    } catch (err) {
      throw new Error(JSON.stringify(err))
    }
  }

  static async delete(user) {
    const repo = new UserRepo()

    try {
      return await repo.delete(user)
    } catch (err) {
      throw new Error(JSON.stringify(err))
    }
  }

  static async deleteAll() {
    const repo = new UserRepo()

    try {
      return await repo.delete()
    } catch (err) {
      throw new Error(JSON.stringify(err))
    }
  }

  static async all(){
    const repo = new UserRepo()

    try {
      return await repo.select()
    } catch (err) {
      throw new Error(JSON.stringify(err))
    }
  }
}
