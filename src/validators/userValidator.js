import EmailValidator from './emailValidator.js'

export default class UserValidator {
  constructor(){
    this.errors = []
  }

  validateEmail(email){
    const emailValidator = new EmailValidator(email, this.errors)

    return emailValidator
      .validatePresence()
      .validateFormat()
      .allErrors()
  }
}
