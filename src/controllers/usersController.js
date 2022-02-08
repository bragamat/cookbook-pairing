import express from 'express'
import UserRepo from '../repositories/userRepo.js'
import UserFactory from '../factories/userFactory.js'

export const UsersController = express.Router()

UsersController.post('/', async (req, res) => {
  const userFactory = new UserFactory(req.body.user, UserRepo)

  try {
    return res.json(await userFactory.save())
  } catch(err) {
    return res.status(400).json(JSON.parse(err.message))
  }
})
