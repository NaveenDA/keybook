import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import properties from './config/properties';

class middleware {
  static token: any;
  static jwtPayload: any;

  static checkToken(req:Request,res:Response,next:NextFunction):void { 
    middleware.token = req.headers['x-access-token'] || req.headers['authorization'];
    if (middleware.token.startsWith('Bearer ')) { 
      // Remove the Bearer from string
      middleware.token = middleware.token.slice(7, middleware.token.length);
    }

    if (middleware.token) { 
      try {
        console.log("middleware.token:", properties.secret);
        middleware.jwtPayload = jwt.verify(middleware.token, properties.secret);
        //.middleware.jwtPayload = middleware.jwtPayload;
        req.tokenDecode = jwt.decode(middleware.token, properties.secret);
        console.log('Current userid: ', req.tokenDecode);
        next();
      } catch (error) { 
        res.status(401).send({
          message: 'Invalid Token'
        });
        return;
      }
    }
  } 
}
export default { middleware };
