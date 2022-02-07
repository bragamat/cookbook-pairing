import express from 'express'
import UserRepo from '../repositories/userRepo.js'
import UserFactory from '../factories/userFactory.js'

export const UsersController = express.Router()

UsersController.post('/', async (req, res) => {
  const userFactory = new UserFactory(req.body.params, UserRepo)

  if (userFactory.save()){
    return res.json(userFactory)
  }

  return res.status(400).json(userFactory)
})
