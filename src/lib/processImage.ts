import * as fs from 'fs-extra'
import * as sharp from 'sharp'
import * as path from 'path'
import logger from './logger'
import {InputFile} from '../interfaces/fileUpload'

export const ProccessImage = (file: InputFile): Promise<string> => {
    return new Promise((resolve,reject)=>{
        if(!file.path || !file.filename){
            reject('Falha no salvamento do arquivo')
        }
        let [filename,ext] = file.filename.split('.')
        const resizeDestinationPath = path.resolve(file.destination, "resized");
        const fileResizeDestinationPath = path.resolve(resizeDestinationPath,`${filename}.jpg`)
        Promise.resolve()
        .then(() => fs.ensureDir(resizeDestinationPath))
        .then(() => sharp(file.path)
        .resize(500)
        .flatten({background :{r:255,g:255,b:255}})
        .jpeg({ quality: 70 })
        .toFile(fileResizeDestinationPath))       
        .then(() => resolve(fileResizeDestinationPath))
        .catch(err=>{
            logger.error(err.message,err)
            reject(err.message)
        })
    })


}