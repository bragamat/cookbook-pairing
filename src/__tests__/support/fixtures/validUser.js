import UserFactory from '../../../factories/userFactory.js'
const validUserParams = { name: 'Mateus Braga', email: 'valid@email.com', age: 26 }

export default class UserFixture {
  static build(){
    return new UserFactory(validUserParams)
  }
  static async create(){
    return await new UserFactory(validUserParams).save()
  }
}
