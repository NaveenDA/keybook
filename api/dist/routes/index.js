"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controller/user.controller");
const middleware_1 = __importDefault(require("../middleware"));
class Routes {
    constructor() {
        this.userController = new user_controller_1.UserController();
        /**
         * routes
         */
        this.api = '/api/v3';
        this.apiPrivate = this.api + '/private';
        this.apiPublic = this.api + '/public';
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET Request successfull....'
            });
        });
        app.use(this.apiPrivate, middleware_1.default.middleware.checkToken, (err, req, res, next) => {
            if (err) {
                res.status(401).send({
                    message: 'Inavlid Route'
                });
            }
            next();
        });
        /**
         * User
         */
        app.route(this.api + '/user')
            .get(this.userController.addNewUser)
            .post(this.userController.addNewUser);
        app.route(this.api + '/login')
            .post(this.userController.login);
        /**
         * Folder
         */
        app.route(this.apiPrivate + '/folder')
            .get((req, res) => {
            console.log(middleware_1.default.middleware.checkToken);
            res.status(200).send({
                message: 'Folders Get Request Successfull.....'
            });
        })
            .post((req, res) => {
            res.status(200).send({
                message: 'Folders Post request Successfully'
            });
        });
        /**
         * Folder Details
         */
        app.route(this.apiPrivate + '/folder/:folderId')
            .get((req, res) => {
            res.status(200).send({
                message: 'Specific folder get successfully.....'
            });
        })
            .post((req, res) => {
            res.status(200).send({
                message: 'Specific folder post successfully....'
            });
        })
            .put((req, res) => {
            res.status(200).send({
                message: 'Specific folder post successfully'
            });
        })
            .delete((req, res) => {
            res.status(200).send({
                message: 'Specific folder delete successfully'
            });
        });
        /**
         * Notes
         */
        app.route(this.apiPrivate + '/notes')
            .get((req, res) => {
            res.status(200).send({
                message: 'Notes Get Request Successfull.....'
            });
        })
            .post((req, res) => {
            res.status(200).send({
                message: 'Notes Post request Successfully'
            });
        });
        /**
         * Notes Details
         */
        app.route(this.apiPrivate + '/note/:noteId')
            .get((req, res) => {
            res.status(200).send({
                message: 'Specific note get successfully.....'
            });
        })
            .post((req, res) => {
            res.status(200).send({
                message: 'Specific note post successfully....'
            });
        })
            .put((req, res) => {
            res.status(200).send({
                message: 'Specific Note update successfully'
            });
        })
            .delete((req, res) => {
            res.status(200).send({
                message: 'Specific note delete successfully'
            });
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map