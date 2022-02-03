import InvalidParams from '../errors/invalidParams.js'

export default class UserModel {
  constructor(params, emailValidator) {
    const { name, email, age } = params
    this.name = name
    this.age = age
    this.email = email
    this.emailValidator = emailValidator
  }

  isValid() {
    this.errors = { message: 'Usuario e invalido' }

    if(!this.name || !this.age || !this.email) {
      throw new InvalidParams()
    }

    if(!this.emailValidator.validate(this.email)) {
      throw new InvalidParams(`InvalidParams - email: ${this.email}`)
    }

    return true
  }
}
