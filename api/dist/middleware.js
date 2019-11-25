"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const properties_1 = __importDefault(require("./config/properties"));
class middleware {
    static checkToken(req, res, next) {
        middleware.token = req.headers['x-access-token'] || req.headers['authorization'];
        if (middleware.token.startsWith('Bearer ')) {
            // Remove the Bearer from string
            middleware.token = middleware.token.slice(7, middleware.token.length);
        }
        if (middleware.token) {
            try {
                console.log("middleware.token:", properties_1.default.secret);
                middleware.jwtPayload = jsonwebtoken_1.default.verify(middleware.token, properties_1.default.secret);
                //.middleware.jwtPayload = middleware.jwtPayload;
                console.log('Current userid: ', jsonwebtoken_1.default.decode(middleware.token, properties_1.default.secret));
                next();
            }
            catch (error) {
                res.status(401).send({
                    message: 'Invalid Token'
                });
                return;
            }
        }
    }
}
exports.default = { middleware };
//# sourceMappingURL=middleware.js.map