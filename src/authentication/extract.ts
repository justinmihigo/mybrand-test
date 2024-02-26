import passport from "passport";
import {Strategy, ExtractJwt, VerifiedCallback} from "passport-jwt"
import User from "../models/User";

passport.use(
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        secretOrKey: "SECRET_KEY"
    },
    async( payload:{user:Object}, done:VerifiedCallback) =>{
        try{
            return done(null, payload.user);
        }
        catch(error){
            done(error)
        }
    
    }
    )
);
export default passport;