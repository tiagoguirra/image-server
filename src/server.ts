import * as express from "express";
import * as http from "http";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as responseTime from "response-time";
import * as methodOverride from "method-override";
import * as path from "path";
import logger from './lib/logger'
import router from "./routes";
import * as allRoutes from "express-list-endpoints";
export default class Server {
  app: express.Application;
  route: express.Router;
  logger: any;
  constructor() {
    this.app = express();
    this.logger = logger;
  }
  static init() {
    return new this().run();
  }
  registerRoutes() {    
    this.app.use("/", router);
  }  
  listRoutes() {
    this.logger.debug("======== ALL ROUTES ===========\n");
    allRoutes(this.app)
      .filter(route => route.path.indexOf("function") < 0)
      .forEach(route => {
        this.logger.debug("\t-" + route.methods.join(",") + "\t" + route.path);
      });
    this.logger.debug("========+++++++++++ ===========\n");
  }
  async run() {
    try {      
      this.app.set("json spaces", 2);
      this.app.disable("x-powered-by");
      this.app.options("*", cors());
      this.app.use(compress());
      this.app.use(responseTime());
      this.app.use(express.static(path.join(__dirname, "../public/")));
      this.app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
      this.app.use(bodyParser.json({ limit: "100mb" }));
      this.app.use(methodOverride());
      this.app.use(
        cors({
          origin: "*",
          methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"]
        })
      );
      this.registerRoutes();
      const server = http.createServer(this.app);      
      
      const port = process.env.PORT || 3333;
      const host = process.env.HOST || "localhost";
      const name = process.env.APP_NAME || 'Image server';
      await server.listen({ port, host }, () =>
        this.logger.log(`${name} running on port ${port}`)
      );
      server.timeout = 10 * 1000 * 60;
      this.listRoutes();
    } catch (err) {
      this.logger.error(`Failure to run application ${err.message}`);
      this.logger.trace(err);
      throw new Error("Application is crashed");
    }
  }
}
