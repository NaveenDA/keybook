import { Request, Response } from 'express';
import { UserController } from '../controller/user.controller';
import { FolderController } from '../controller/folder.controller';
import checkToken from '../middleware'
import { NextFunction } from 'connect';

export class Routes { 
  public userController: UserController = new UserController();
  public folderController: FolderController = new FolderController();
  /**
   * routes
   */
  public api: string = '/api/v3';
  public apiPrivate: string = this.api + '/private';
  public apiPublic: string = this.api + '/public';
  public routes(app): void {
    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET Requestsadasdasd successfull....'
        })
      });
    app.use(this.apiPrivate,checkToken.middleware.checkToken, (err:Error,req:Request,res:Response,next:NextFunction) => { 
      if (err) { 
        res.status(401).send({
          message: 'Inavlid Route'
        })
      }
      next();
    })
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
    app.route(this.apiPrivate + '/folders')
      .get(this.folderController.getAllFolder)
      .post((req: Request, res: Response) => {
        res.status(200).send({
          message: 'sdsadasd'
        })
      });
    /**
     * Folder Details
     */
    app.route(this.apiPrivate + '/folder/:folderId')
      .get((req: Request, res: Response) => { 
        res.status(200).send({
          message: 'Specific folder get successfully.....'
        })
      })
      .post((req: Request, res: Response) => { 
        res.status(200).send({
          message: 'Specific folder post successfully....'
        })
      })
      .put((req:Request, res:Response) => { 
        res.status(200).send({
          message: 'Specific folder post successfully'
        })
      })
      .delete((req: Request, res: Response) => { 
        res.status(200).send({
          message: 'Specific folder delete successfully'
        })
      })
    /**
     * Notes
     */
    app.route(this.apiPrivate + '/notes')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'Notes Get Request Successfull.....'
        })
      })
      .post((req: Request, res: Response) => {
        res.status(200).send({
          message: 'Notes Post request Successfully'
        })
      });
    /**
     * Notes Details
     */
    app.route(this.apiPrivate + '/note/:noteId')
      .get((req: Request, res: Response) => { 
        res.status(200).send({
          message: 'Specific note get successfully.....'
        })
      })
      .post((req: Request, res: Response) => { 
        res.status(200).send({
          message: 'Specific note post successfully....'
        })
      })
      .put((req:Request, res:Response) => { 
        res.status(200).send({
          message: 'Specific Note update successfully'
        })
      })
      .delete((req: Request, res: Response) => { 
        res.status(200).send({
          message: 'Specific note delete successfully'
        })
      })
  }
}