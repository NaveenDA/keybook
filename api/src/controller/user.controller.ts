import * as mongoose from 'mongoose';
import Bcrypt from 'bcryptjs';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { UserSchema,IUser } from '../model/user.model';
import { Request, Response, response } from 'express';
import properties from '../config/properties';

// let privateKey = fs.readFileSync('./private.key', 'utf8');
// let publickKey = fs.readFileSync('./public.key', 'utf8');

const User = mongoose.model<IUser>('User', UserSchema);
User.createIndexes();
export class UserController { 
  public async addNewUser(req: Request, res: Response) { 
    try {
      let newUser = new User(req.body);
      let result = await newUser.save();
      res.status(200).send(result);
    } catch (error) { 
      res.status(500).send(error);
    }
  }
  public async login(req: Request, res: Response) { 
    try {
      let user = await User.findOne({
        email: req.body.email
      }).exec();
      if (!user) { 
        return res.status(400).send({
          message:'Email or password invalid'
        })
      }
      if (!Bcrypt.compareSync(req.body.password, user.password)) { 
        return res.status(400).send({
          message:'Email or password invalid'
        })
      }
      let token = jwt.sign({ email: user.email, id: user._id },
        properties.secret
      );
      // user.comparePassword(req.body.password,(match: any) => {
      //     if(!match) {
      //         return res.status(400).send({ message: "The password is invalid" });
      //     }
      // });
      res.status(200).send({
        success: true,
        message: "The user name password is correct",
        token: token
      })
    } catch (error) { 
      res.status(500).send(error);
    }
  }
}