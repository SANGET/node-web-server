// import passport from "passport";
// import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import jwt, { VerifyErrors } from "jsonwebtoken";

import { JwtOptions } from "@nws/configs/types";
import CodeMap from "@nws/res-handler/res-code-mapper/enum";
import { CodeCN } from "@nws/res-handler/res-code-mapper";
import { Users } from "@nws/entities/users";

import findUser from "./find-user";
import { ResponseMsgStruct } from "@nws/res-handler";

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
            resolve({
              code: CodeMap["成功"],
              user
            });
          } else {
            reject(CodeMap["用户名或密码错误"]);
          }
        }
      }
    });
  });
};

export const authJWT = (jwtOptions: JwtOptions) => async (req: Req, res: Res, next: Next) => {
  const { headerAuthKey } = jwtOptions;
  let token = req.headers[headerAuthKey];
  if(Array.isArray(token)) token = token[0];

  verifyJWT(jwtOptions, token)
    .then(res => {
      next();
    })
    .catch(errCode => {
      res.status(401).json(ResponseMsgStruct(errCode));
    });
};
