import passport from 'passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import User, { IUser } from '../models/User';

const JWT_SECRET = 'SECRET_KEY';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

const strategy = new Strategy(options, (payload, done) => {
  
  User.findOne({ email: payload.email})
    .then((user) => {
      if (user) {
        return done(null, payload);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err, null);
    });
});

passport.use(strategy);

export default passport;