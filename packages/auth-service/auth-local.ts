import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import CodeMap from "@nws/res-handler/res-code-mapper/enum";
import { JwtOptions } from "@nws/configs/types";

import findUser from "./find-user";
import { checkToken } from "./check-token";
import { verifyJWT } from "./auth-jwt";
import { ResponseMsgStruct } from "@nws/res-handler";

// interface AuthField {
//   username: string;
//   password: string;
// }

// checkToken(tokenConfig),
export const authLocal = (tokenConfig: JwtOptions) => async (req: Req, res: Res, next: Next) => {
  const { headerAuthKey, secretOrPrivateKey, exp } = tokenConfig;
  const { username, password, token } = req.body;
  let handledResult: HandledResult;

  const getLoginSuccessInfo = (id: number) => {
    const token = jwt.sign(
      {
        exp,
        id,
      },
      secretOrPrivateKey,
    );
    return ResponseMsgStruct(CodeMap["成功"], {
      token
    });
  };
  
  if(token) {
    /** 使用 token 登陆 */
    verifyJWT(tokenConfig, token)
      .then((veriftRes) => {
        res.locals.handledResult = getLoginSuccessInfo(veriftRes.user.id);
        next();
      })
      .catch(errRes => {
        res.status(401).json(ResponseMsgStruct(CodeMap["登陆信息失效"]));
      });
  } else {
    /** 使用账号密码登陆 */
    const user = await findUser({ username });
    if(user) {
      try {
        const isMatch = bcrypt.compareSync(password, user.password);
        if(isMatch) {
          handledResult = getLoginSuccessInfo(user.id);
        } else {
          handledResult = ResponseMsgStruct(CodeMap["用户名或密码错误"]);
        }
      } catch(err) {
        handledResult = ResponseMsgStruct(CodeMap["警告！密码解密失败"], null, err);
      }
    } else {
      handledResult = ResponseMsgStruct(CodeMap["用户名或密码错误"]);
    }
    res.locals.handledResult = handledResult;
    next();
  }
};
