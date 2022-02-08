export default class UserRepo {
  constructor(strategy) {
    this.strategy = strategy
    this.table = 'users'
  }

  async create(user) {
    return await this.strategy.create({ user, table: this.table })
  }

  async delete() {
    return await this.strategy.delete({ table: this.table })
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
