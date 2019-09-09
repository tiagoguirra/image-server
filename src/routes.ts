import { Router } from "express";
import Middlewares from "./middleware";
import Controllers from "./controllers";
import {Request,Response} from './interfaces/expressExtend'

export const routes = Router();
export default routes;

// middlewares globais
routes.use("/", Middlewares.RequestMiddleware);
routes.use("/", Middlewares.ResponseMiddleware);


//rota padrão 
routes.get("/", (req: Request, res: Response) => {
  res.status(200).send({ ok: true });
});

// rotas da aplicação
routes.post(
  "/upload",
  Middlewares.uploadImage.single("image"),
  Controllers.uploadImage.store
);

routes.get('/proxyimage/:pathfile',Controllers.proxyImage.forwarding)
