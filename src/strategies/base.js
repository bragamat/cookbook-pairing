export default class Strategy {
  constructor(db){
    this.db = db
  }

  async connect(){
    return await this.db.connect()
  }
  async create(item) {
    return await this.db.create(item)
  }
  async read(item){
    return await this.db.read(item)
  }

  async delete(item){
    return await this.db.delete(item)
  }
}

