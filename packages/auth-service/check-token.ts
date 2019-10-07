import jwt, { VerifyErrors } from "jsonwebtoken";
import CodeMap from "@nws/res-handler/res-code-mapper/enum";
import { CodeCN } from "@nws/res-handler/res-code-mapper";
import findUser from "./find-user";
import { JwtOptions } from "@nws/configs/types";
import { verifyJWT } from "./auth-jwt";

export const checkToken = (tokenConfig: JwtOptions) => (req: Req, res: Res, next: Next) => {
  const { headerAuthKey, secretOrPrivateKey } = tokenConfig;
  const TockenExp = tokenConfig.exp;
  let token = req.headers[headerAuthKey];
  if(Array.isArray(token)) token = token[0];
  if(!token) {
    // res.sendStatus(401);
    next();
  } else {
    verifyJWT(tokenConfig, token)
      .then(({ code, user }) => {
        res.status(200).json({
          code,
          message: CodeCN[code],
          data: {
            token: jwt.sign(
              {
                exp: TockenExp,
                id: user.id,
              },
              secretOrPrivateKey,
            )
          }
        });
      }).catch(errCode => {
        res.status(401).json({
          code: errCode,
          message: CodeCN[errCode]
        });
      });
    // jwt.verify(token, secretOrPrivateKey, async (err: VerifyErrors, decoded: any) => {
    //   const now = Date.now() / 1000;
    //   const { exp, id } = decoded;
    //   if(!err) {
    //     /** jwt 过期 */
    //     if(exp < now) {
    //       const code = CodeMap["登陆信息已过期"];
    //       return res.status(401).json({
    //         code,
    //         message: CodeCN[code]
    //       });
    //     } else {
    //       const code = 0;
    //       const user = await findUser({ id });
    //       if(user) {
    //         return res.status(200).json({
    //           code,
    //           message: CodeCN[code],
    //           data: {
    //             token: jwt.sign(
    //               {
    //                 exp: TockenExp,
    //                 id: user.id,
    //               },
    //               secretOrPrivateKey,
    //             )
    //           }
    //         });
    //       }
    //     }
    //   }
    // });
  }
};