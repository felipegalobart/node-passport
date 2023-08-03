import passport from "passport";
import dotenv from 'dotenv';
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

dotenv.config();

const notAuthorizedJson = { status: 401, message: 'Não Autorizado' };

const options = {
  jwtFromRequest: 
}

passport.use(new JWTStrategy(options, (payload, done) => {

  return done(null, user)
  return done(notAuthorizedJson, false)
}));


export default passport;