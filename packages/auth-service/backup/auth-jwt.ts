import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { JwtSec, Authorization } from "@nws/configs";
import findUser from "./find-user";

const jwtOpts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromHeader(Authorization),
  secretOrKey: JwtSec,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  console.log(payload);
  try {
    /** TODO: 将已经查过的用户放入 redis 缓存中 */
    const user = await findUser({ id: payload.id });
    // done(null, false);

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
