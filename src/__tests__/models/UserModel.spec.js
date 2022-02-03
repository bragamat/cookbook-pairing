import UserModel from '../../models/user.js'
import InvalidParams from '../../errors/invalidParams.js'
import EmailValidator from '../../validators/emailValidator.js'


describe('User Model', () => {
  describe('creating a user', () => {

    it('throws InvalidParams if invalid user', () => {
      const email = 'invalid_email'
      const emailValidator = new EmailValidator(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      )
      const params = {
        name: 'name',
        email,
        age: 18,
      }
      const user = new UserModel(params, emailValidator)
      const validUser = new UserModel({
        name: 'Mateus',
        email: 'mateus@braga.com',
        age: 21
      }, emailValidator)
      const userAgeInvalid = new UserModel({name: null, age: null}, emailValidator)


      expect(() => user.isValid()).toThrowError(new InvalidParams(`InvalidParams - email: ${email}`));
      expect(() => userAgeInvalid.isValid()).toThrowError(new InvalidParams())
      expect(validUser.isValid()).toBe(true)
    })
  })
})
