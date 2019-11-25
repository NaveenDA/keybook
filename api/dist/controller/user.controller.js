"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../model/user.model");
const properties_1 = __importDefault(require("../config/properties"));
// let privateKey = fs.readFileSync('./private.key', 'utf8');
// let publickKey = fs.readFileSync('./public.key', 'utf8');
const User = mongoose.model('User', user_model_1.UserSchema);
User.createIndexes();
class UserController {
    addNewUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newUser = new User(req.body);
                let result = yield newUser.save();
                res.status(200).send(result);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield User.findOne({
                    email: req.body.email
                }).exec();
                if (!user) {
                    return res.status(400).send({
                        message: 'Email or password invalid'
                    });
                }
                if (!bcryptjs_1.default.compareSync(req.body.password, user.password)) {
                    return res.status(400).send({
                        message: 'Email or password invalid'
                    });
                }
                let token = jsonwebtoken_1.default.sign({ email: user.email, id: user._id }, properties_1.default.secret);
                // user.comparePassword(req.body.password,(match: any) => {
                //     if(!match) {
                //         return res.status(400).send({ message: "The password is invalid" });
                //     }
                // });
                res.status(200).send({
                    success: true,
                    message: "The user name password is correct",
                    token: token
                });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map