import express from 'express'
import UserRepo from '../repositories/userRepo.js'
import UserFactory from '../factories/userFactory.js'

export const UsersController = express.Router()

UsersController.post('/', async (req, res) => {
  const userFactory = new UserFactory(req.body.user, UserRepo)

  try {
    const user = await userFactory.save()
    return res.json(user)
  } catch(err) {
    return res.status(400).json(userFactory)
  }

})
