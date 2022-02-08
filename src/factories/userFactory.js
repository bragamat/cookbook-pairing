import UserModel from '../models/user.js'
import { postgres } from '../repositories/base.js'

export default class UserFactory {
  constructor(params, repo){
    this.user = new UserModel({...params})
    this.repo = repo
  }

  async save(){
    if(this.user.isValid()) {

      try {
        return await this.repo.save(this.user, postgres)
      } catch (err) {
        throw new Error(err.message)
      }
    }

    return this.user.errors
  }
}
