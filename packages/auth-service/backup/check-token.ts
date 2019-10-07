import jwt from "jsonwebtoken";
import { Authorization, JwtSec, TockenExp } from "@nws/configs";
import CodeMap from "@nws/res-handler/res-code-mapper/enum";
import { CodeCN } from "@nws/res-handler/res-code-mapper";
import findUser from "./find-user";

export const checkToken = (req: Req, res: Res, next: Next) => {
  const token = req.headers[Authorization];
  if(!token) {
    // res.sendStatus(401);
    next();
  } else {
    jwt.verify(token, JwtSec, async (err, decoded: any) => {
      const now = Date.now() / 1000;
      const { exp, id } = decoded;
      if(!err) {
        /** jwt 过期 */
        if(exp < now) {
          const code = CodeMap["登陆信息已过期"];
          return res.status(401).json({
            code,
            message: CodeCN[code]
          });
        } else {
          const code = 0;
          const user = await findUser({ id });
          if(user) {
            return res.status(200).json({
              code,
              message: CodeCN[code],
              data: {
                token: jwt.sign(
                  {
                    exp: TockenExp,
                    id: user.id,
                  },
                  JwtSec,
                )
              }
            });
          }
        }
      }
    });
  }
};