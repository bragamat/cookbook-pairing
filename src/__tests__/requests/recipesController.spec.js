import { app } from '../../app.js'
import req from 'supertest'

describe('/recipes', () => {

  describe.only('#GET', () => {
    it('returns a user from database by id', async () => {
      const result = await req(app).get('/receitas')

      expect(result.status).toBe(200)
      expect(result.body).toEqual({ hello: 'world' })
    })
  })
})

