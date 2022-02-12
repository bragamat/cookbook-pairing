import UserModel from '../models/user.js'
import UserRepo from '../repositories/userRepo.js'
import { postgres } from '../repositories/base.js'

export default class UserFactory {
  constructor(repo = UserRepo){
    this.repo = repo
  }

  static async save(params){
    const user = new UserModel(params)
    const fact = new UserFactory()

    if(user.isValid()) {
      try {
        return await fact.repo.save(user, postgres)
      } catch(err) {
        throw new Error(err.message)
      }
    }
    return user.errors
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

  async delete(){
    try{
      return await this.repo.delete({id: this.user.id}, postgres)
    } catch (eerr) {
    }
  }
}
