import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import CodeMap from "@nws/res-handler/res-code-mapper/enum";
import { JwtOptions } from "@nws/configs/types";

import findUser from "./find-user";
import { checkToken } from "./check-token";

interface AuthField {
  username: string;
  password: string;
}

export const authLocal = (tokenConfig: JwtOptions) => [
  checkToken(tokenConfig),
  async (req: Req, res: Res, next: Next) => {
    const { secretOrPrivateKey, exp } = tokenConfig;
    const { username, password } = req.body;
    const user = await findUser({ username });
    let handledResult: HandledResult;
    if(user) {
      try {
        const isMatch = bcrypt.compareSync(password, user.password);
        if(isMatch) {
          const token = jwt.sign(
            {
              exp,
              id: user.id,
            },
            secretOrPrivateKey,
          );
          handledResult = {
            code: CodeMap["成功"],
            data: {
              token
            }
          };
        } else {
          handledResult = {
            code: CodeMap["用户名或密码错误"]
          };
        }
      } catch(err) {
        handledResult = {
          code: CodeMap["警告！密码解密失败"],
          message: err
        };
      }
    } else {
      handledResult = {
        code: CodeMap["用户名或密码错误"]
      };
    }
    // return handledResult;
    res.locals.handledResult = handledResult;
    next();
  }
];
