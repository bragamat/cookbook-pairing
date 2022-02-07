import express from 'express'
import { UsersController } from './controllers/usersController.js'

export const app = express()

app.use(express.json())
app.use('/users', UsersController)
