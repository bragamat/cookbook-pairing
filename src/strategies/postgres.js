import knex from 'knex'

export default class PostgresStrategy {
  #instance
  constructor(DB_URL) {
    this.DB_URL = DB_URL
    this.table = 'users'
  }

  async connect(){
    this.#instance = knex({
      connection: this.DB_URL,
      client: 'pg'
    })

    return await this.#instance.raw('SELECT 1 + 1 as result')
  }

  create(item) {
    debugger
    return this.#instance
    .insert(item)
    .into(this.table)
  }

  read(){
    return this.#instance
      .select()
      .from(this.table)
  }
}
