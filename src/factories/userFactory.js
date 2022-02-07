import UserModel from '../models/user.js'
import { postgres } from '../repositories/base.js'

export default class UserFactory {
  constructor(params, repo){
    this.user = new UserModel({...params})
    this.repo = repo
  }

  async save(){
    try {
      const result = await this.repo.save(this.user, postgres)

      return result
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
