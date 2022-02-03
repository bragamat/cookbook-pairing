export default class InvalidParamsError extends Error {
  constructor(){
    super()
    this.name = 'InvalidParamsError'
  }
}
