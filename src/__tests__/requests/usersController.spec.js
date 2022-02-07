import { app } from '../../app.js'
import req from 'supertest'

describe('#POST /users', () => {
  it('saves a user with proper params', async () => {
    const user = {
      name: 'Some name',
      email: 'valid@email.com',
      age: '26'
    }
    const result = await req(app)
      .post('/users')
      .send(user)


    expect(result.status).toEqual(200)
    expect(result.body.data).toEqual(user)
  })
})
