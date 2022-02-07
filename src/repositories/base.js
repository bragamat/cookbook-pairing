
import Strategy from '../strategies/base.js'
import PGStrategy from '../strategies/postgres.js'
import MongoStrategy from '../strategies/mongo.js'

// const PG_URL = "postgres://docker:docker@localhost:5444"
const MONGO_URL = "mongodb://mongo:mongo@localhost:27017/videos"

export const postgres = new Strategy(new PGStrategy())
export const mongo = new Strategy(new MongoStrategy(MONGO_URL))

await mongo.connect()
await postgres.connect()
