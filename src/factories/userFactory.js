import UserModel from '../models/user.js'
import UserRepo from '../repositories/userRepo.js'
import { postgres } from '../repositories/base.js'

export default class UserFactory {
  constructor(params, repo = UserRepo){
    this.user = new UserModel({...params})
    this.repo = repo
  }

  async save(){
    if(this.user.isValid()) {

      try {
        return await this.repo.save(this.user, postgres)
      } catch (err) {
        // console.log(' ta caindo aqui ? => ', this.user.errors)
        throw new Error(err.message)
      }
    }
    // console.log(' ta caindo aqui ? => ', this.user.errors)

    return this.user.errors
  }

  async delete(){
    try{
      return await this.repo.delete({id: this.user.id}, postgres)
    } catch (eerr) {
    }
  }
}
