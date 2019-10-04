import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";

import { getManager } from "typeorm";
import bcrypt from "bcrypt";

import { Users } from "@nws/entities/users";
import CodeMap from "@nws/res-handler/res-code-mapper/enum";

import findUser from "./find-user";
import { JWT_SEC, TockenExp } from "@nws/configs";

// export const findUser = async (options) => {
//   const { username, password } = options;
//   const userRepository = getManager().getRepository(Users);
//   const user = await userRepository.findOne({ username });
//   return user;

//   // req.locals.user = user;

//   // next();
// };

interface AuthField {
  username: string;
  password: string;
}

// export const auth = async (req: Req, res: Res, next: Next) => {
export const auth = async (options: AuthField): Promise<HandledResult> => {
  const { username, password } = options;
  const user = await findUser({ username });
  let handledResult: HandledResult;
  if(user) {
    try {
      const isMatch = bcrypt.compareSync(password, user.password);
      if(isMatch) {
        handledResult = {
          code: CodeMap["成功"],
          data: {
            token: jwt.sign(
              {
                exp: TockenExp,
                id: user.id,
              },
              JWT_SEC,
            )
          }
        };
      } else {
        handledResult = {
          code: CodeMap["用户名或密码错误"]
        };
      }
    } catch(err) {
      handledResult = {
        code: CodeMap["警告！密码解析失败"],
        message: err
      };
    }
  } else {
    handledResult = {
      code: CodeMap["用户名或密码错误"]
    };
  }
  return handledResult;
  // res.locals.handledResult = handledResult;
  // next();
};

const localOpts = {
  // usernameField: 'email',
};
const localStrategy = new LocalStrategy(
  localOpts,
  async (username, password, done) => {
    const authRes = await auth({ username, password });
    const { code, message } = authRes;
    const hasErr = code != 0;
    done(hasErr, hasErr ? false : authRes, { message });
  }
);

passport.use(localStrategy);

export const authLocal = passport.authenticate("local", { session: false });
