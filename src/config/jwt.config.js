import passport from "passport";
import jwt from "passport-jwt";
import envConfig from "./env.config.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

export const initializePassportJWT = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_KEY,
      },
      async (jwtPayload, done) => {
        try {
          return done(null, jwtPayload);
        } catch (e) {
          return done(e);
        }
      }
    )
  );

  passport.use(
    "jwtResetPassword",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([queryExtractor]),
        secretOrKey: process.env.JWT_KEYRP,
      },
      async (jwtPayload, done) => {
        try {
          return done(null, jwtPayload);
        } catch (e) {
          return done(e);
        }
      }
    )
  );
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[envConfig.cookieKey];
  }
  return token;
};

const queryExtractor = (req) => {
  let token = null;
  if (req.query) {
    token = req.query.token
  }
  return token;
};
