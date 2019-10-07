// import passport from "passport";
// import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import jwt, { VerifyErrors } from "jsonwebtoken";

import { JwtOptions } from "@nws/configs/types";
import CodeMap from "@nws/res-handler/res-code-mapper/enum";
import { CodeCN } from "@nws/res-handler/res-code-mapper";
import { Users } from "@nws/entities/users";

import findUser from "./find-user";

/** 使用统一验证的 code */
export type VerifyJWTRes = {
  code: number;
  user?: Users;
};

export const verifyJWT = (jwtOptions: JwtOptions, token: string) => {
  return new Promise<VerifyJWTRes>((resolve, reject) => {
    const { secretOrPrivateKey } = jwtOptions;
    jwt.verify(token, secretOrPrivateKey, async (err: VerifyErrors, decoded: any) => {
      const now = Date.now() / 1000;
      const { exp, id } = decoded;
      if(!err) {
        /** jwt 过期 */
        if(exp < now) {
          reject(CodeMap["登陆信息已过期"]);
        } else {
          const user = await findUser({ id });
          if(user) {
            reject(CodeMap["成功"]);
          } else {
            resolve({
              code: CodeMap["用户名或密码错误"],
              user
            });
          }
        }
      }
    });
  });
};

export const authJWT = (jwtOptions: JwtOptions) => async (req: Req, res: Res, next: Next) => {
  const { headerAuthKey, secretOrPrivateKey } = jwtOptions;
  let token = req.headers[headerAuthKey];
  if(Array.isArray(token)) token = token[0];

  verifyJWT(jwtOptions, token)
    .then(res => {
      next();
    })
    .catch(errCode => {
      res.status(401).json({
        code: errCode,
        message: CodeCN[errCode]
      });
    });
};


// const jwtOpts: StrategyOptions = {
//   jwtFromRequest: ExtractJwt.fromHeader(Authorization),
//   secretOrKey: JwtSec,
// };

// const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
//   console.log(payload);
//   try {
//     /** TODO: 将已经查过的用户放入 redis 缓存中 */
//     const user = await findUser({ id: payload.id });
//     // done(null, false);

//     if (!user) {
//       return done(null, false);
//     }

//     return done(null, user);
//   } catch (e) {
//     return done(e, false);
//   }
// });

// passport.use(jwtStrategy);

// export const authJwt = passport.authenticate("jwt", { session: false });
