import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { FolderSchema,IFolder} from '../model/folder.model';

const Folder = mongoose.model<IFolder>('Folder', FolderSchema);
Folder.createIndexes();
export class FolderController { 

  public getAllFolder(req: Request, res: Response) { 
    console.log('req.tokenDecode: ',req.tokenDecode);
    res.status(200).send({
      message: 'sdfsdasdsad',
      user: req.tokenDecode
    })
  }
}