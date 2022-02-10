import knex from 'knex'
import { knexConfig } from '../db/knex.js'

const env = process.env.NODE_ENV || 'development'

export default class PostgresStrategy {
  #instance
  constructor(DB_URL) {
    this.DB_URL = DB_URL
  }

  async connect(){
    try {
      this.#instance = knex(knexConfig[env])
      return await this.#instance.raw('SELECT 1 + 1 as result')
    } catch (err) {
      throw new Error('Connection Failed!', err)
    }
  }

  async create({ user: { name, age, email }, table }) {
    try {
      const result = await this
        .#instance(table)
        .insert({ name, age, email }, 'id')

      const id = result[0].id
      return { name, age, email, id }
    } catch(err) {
      console.log(err)
    }
  }

  async delete({ table, query }) {
    if(query){
      await this.#instance(table).delete().where(query)
    } else {
      await this.#instance(table).delete()
    }
  }

  async select(table){
    return await this.#instance(table).select().from(table)
  }

  async read({ table, query }){
    return await this.#instance(table).select(query)
  }
}


// (async () => {
//   const pg = new PostgresStrategy()
//   await pg.connect()
//   await pg.create({
//     user: { name: "exanmople", email: "stuff", age: 26 }})
//
//   console.log(await pg.select('users'))
// })()
