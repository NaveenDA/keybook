"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
const dotenv_1 = __importDefault(require("dotenv"));
class App {
    constructor() {
        this.routePrv = new routes_1.Routes();
        this.app = express_1.default();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }
    config() {
        //support Application/json type post data
        this.app.use(body_parser_1.default.json());
        //support application/x-www-form urlencoded post data
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        dotenv_1.default.config({
            path: ".env"
        });
    }
    mongoSetup() {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(process.env.MONGOURL);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map