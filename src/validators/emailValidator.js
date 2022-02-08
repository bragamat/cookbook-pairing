export default class EmailValidator {
  constructor(email, errors, rule = /^\S+@\S+\.\S+$/){
    this.email = email
    this.rule = rule
    this.isValid = true
    this.errors = errors
  }

  allErrors() {
    return this.errors
  }

  validatePresence(){
    if(this.isValid) {
      this.isValid = !!this.email

      if(!this.isValid){
        this.errors.push({ email: 'cant be blank'})
      }
    }
    return this
  }

  validateFormat() {
    if(this.isValid && !this.rule.test(this.email)){
      this.isValid = false
      this.errors.push({ email: 'is invalid' })
    }

    return this
  }
}
