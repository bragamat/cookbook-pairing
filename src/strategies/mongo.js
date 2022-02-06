import MongoDB from 'mongodb'

export default class MongoStrategy {
  #instance
  constructor(DB_URL){
    const { pathname: DB_NAME } = new URL(DB_URL)
    this.DB_URL = DB_URL.replace(DB_NAME, '')
    this.DB_NAME = DB_NAME.replace(/\W/, '')
    this.collection = 'videosFromRecipes'
  }

  async connect(){
    const client = new MongoDB.MongoClient(this.DB_URL, {
      useUnifiedTopology: true
    })

    await client.connect()

    const db = client.db(this.DB_NAME).collection(this.collection)
    this.#instance = db
  }

  async create(item) {
    return await this.#instance.insertOne(item)
  }
  read(item){
    return this.#instance
      .find(item)
      .toArray()
  }
}
