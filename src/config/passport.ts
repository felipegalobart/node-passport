import passport from "passport";
import { BasicStrategy } from "passport-http";
import { User, UserInstance } from "../models/User";
import { Request, Response, NextFunction } from "express";

// Aqui configura a sua strategy

const notAuthorizedJson = { status: 401, message: 'Não autorizado'};

passport.use(new BasicStrategy(async (email, password, done) => {
  if(email && password){
    const user = await User.findOne({
      where: {email, password}
    });
    if(user){
      return done(null, user);
    }
  }else {
    return done(notAuthorizedJson, false);
  }
  
}));

export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
  const authFunction = passport.authenticate('basic', (err: Error, user: UserInstance) => {
    if(user){
      next();
    } else {
      next(notAuthorizedJson);
    }
  });
  authFunction(req, res, next);
}

export default passport;