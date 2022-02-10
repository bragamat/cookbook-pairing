import UserValidator from '../validators/userValidator.js'

export default class UserModel {
  constructor({ id, name, email, age }, validator = UserValidator) {
    this.name = name
    this.email = email
    this.age = age
    this.validator = new validator()
    this.errors = []
    this.id = id
  }

  #validate(){
    const errors = this.validator.validateEmail(this.email)
    this.errors = errors

    return this.validator.errors
  }

  isValid() {
    const err = this.#validate()

    if (err.length){
      throw new Error(JSON.stringify(err))
    }

    return true
  }
}
