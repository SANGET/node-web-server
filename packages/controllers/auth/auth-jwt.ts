import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { JWT_SEC } from "@nws/configs";
import { getManager } from "typeorm";

const jwtOpts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: JWT_SEC,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(jwtStrategy);

export const authJwt = passport.authenticate("jwt", { session: false });
