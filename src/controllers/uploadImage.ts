import {
  Request,
  Response,
  ResponseHanlder
} from "../interfaces/expressExtend";
import {ProccessImage} from '../lib/processImage'

class UploadImageController {
  store(req: Request, res: Response): ResponseHanlder {    
    ProccessImage(req.file)
    return res.success('Created',{image:{
      path:`/proxyimage/${req.file.filename}`,
      resized: false
    }});
  }
}

export default new UploadImageController();
