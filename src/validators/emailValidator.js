export default class EmailValidator {
  constructor(rule){
    this.rule = rule
  }
  validate(email) {
    return this.rule.test(email)
  }
}
