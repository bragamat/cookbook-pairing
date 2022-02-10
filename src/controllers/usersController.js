import express from 'express'
import UserRepo from '../repositories/userRepo.js'
import UserFactory from '../factories/userFactory.js'

import { postgres } from '../repositories/base.js'
export const UsersController = express.Router()

UsersController.get('/:id', async (req, res) => {
  const userRepo = new UserRepo(postgres, req.params)

  try {
    const user = await userRepo.select()
    return res.json(user[0])
  } catch(err) {
    console.log({ err })
    return res.status(400).json(JSON.parse(err.message))
  }
})

UsersController.post('/', async (req, res) => {
  const userFactory = new UserFactory(req.body.user, UserRepo)

  try {
    return res.json(await userFactory.save())
  } catch(err) {
    return res.status(400).json(JSON.parse(err.message))
  }
})

UsersController.delete('/:id',  async (req, res) => {
  if(!req.params.id){
    return res.status(403).json({ message: 'You must provide a valid id' })
  }
  const userFactory = new UserFactory(req.params, UserRepo)

  await userFactory.delete()

  return res.status(202).json({ message: 'user was removed' })
})
