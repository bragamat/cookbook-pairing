// import { jest } from '@jest/globals'

class UserValidator{
  constructor(fields, params) {
    this.fields = fields
    this.params = params
  }

  validate(){
    const errors = []
    for (const field of this.fields) {
      if(!this.params[field]){
        const erro = {
          [field]: 'cant be blank'
        }
        errors.push(erro)
      }
    }

    return errors
  }
}

describe('UserValidator', () => {
  it.only('validates if fields exist', () => {
    // jest.spyOn(UserValidator.constructor, 'validate')

    const params = {
      name: '',
      age: 'blank',
      email: 'invalid_email'
    }

    const validator = new UserValidator(['name', 'age', 'email'], params)

    const errors = validator.validate()

    expect(errors[0]).toEqual({ name: 'cant be blank' })
    expect(errors.length).toBe(3)
  })

  it.todo('validate that age is greater than 18')
  it.todo('validates email')
  it.todo('validates field types')
  it.todo('UserModel uses UserValidator')
})
