import express from 'express'
import { pipeline } from "stream/promises";
import UploadHandler from '../services/managerVideo.js'
export const RecipesController = express.Router()

RecipesController.get('/', (req, res) => {
  res.status(200).json({ hello: 'world' })
})


// POST /recipes/uploads
RecipesController.post('/video', async function(req, response){
  const uploadHandler = new UploadHandler()

  const onFinish = (response) => () => {
    response.writeHead(200)
    const data = JSON.stringify({ result: 'File uploaded with Success!' })

    response.end(data)
  }

  const busboyInstance = uploadHandler.registerEvents(
    req.headers,
    onFinish(response)
  )

  await pipeline(
    req,
    busboyInstance
  )
})

