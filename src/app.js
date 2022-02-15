import express from 'express'
import { UsersController } from './controllers/usersController.js'
import { RecipesController } from './controllers/recipesController.js'

export const app = express()

app.use(express.json())
app.use('/users', UsersController)
app.use('/receitas', RecipesController)
