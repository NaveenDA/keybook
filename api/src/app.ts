import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Routes } from "./routes";
import dotEnv from "dotenv";

class App { 
    public app: express.Application;
    public routePrv: Routes = new Routes();
    constructor() { 
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }
    private config():void {
        //support Application/json type post data
        this.app.use(bodyParser.json());

        //support application/x-www-form urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        dotEnv.config({
            path: ".env"
        })
    }
    private mongoSetup(): void { 
        
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(process.env.MONGOURL);
    }
}
export default new App().app;