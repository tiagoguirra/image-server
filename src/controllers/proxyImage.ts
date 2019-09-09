import {
    Request,
    Response,
    ResponseHanlder
  } from "../interfaces/expressExtend";
import {stoagePath,stoageResizedPath} from '../config/upload'

import * as path from 'path'
import {raceFiles} from '../lib/raceFiles'

class ProxyImage{
    async forwarding(req: Request,res: Response): Promise<ResponseHanlder | void>{
        try{
            let {pathfile} = req.params
            let noResizedPath = path.resolve(stoagePath,pathfile)
            let resizedPath = path.resolve(stoageResizedPath,pathfile)
            let pathFile = await raceFiles([resizedPath,noResizedPath])
            return res.sendFile(pathFile)
        }catch(err){
            return res.status(404).send()
        }
    }
}

export default new ProxyImage