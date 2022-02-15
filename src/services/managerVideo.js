import Busboy from "busboy"
import fs from 'fs'
import { pipeline } from 'stream/promises'
import { resolve } from 'path'

export default class UploadHandler {
  constructor(downloadsFolder = resolve('uploads')){
    this.downloadsFolder = downloadsFolder
  }

  // handleFileBytes(filename) {
  //   async function* handleData(source) {
  //     for await (const chunk of source) {
  //       // console.log('passou pelo transform')
  //       yield chunk
  //     }
  //   }

  //   return handleData.bind(this)
  // }

  async onFile(fieldname, file, filename){
    const saveTo = `${this.downloadsFolder}/${filename}`

    await pipeline(
      file,
      // this.handleFileBytes.apply(this, [filename]),
      fs.createWriteStream(saveTo)
    )
  }

  registerEvents(headers, onFinish){
    const busboy = new Busboy({ headers })

    busboy.on('file', this.onFile.bind(this))
    busboy.on('finish', onFinish)

    return busboy
  }
}
