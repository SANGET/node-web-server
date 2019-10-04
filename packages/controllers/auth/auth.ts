import passport from "passport";
import LocalStrategy from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

import { getManager } from "typeorm";
import bcrypt from "bcrypt";

import { Users } from "@nws/entities/users";
import CodeMap from "@nws/res-handler/res-code-mapper/enum";


export const findUser = async (req: Req, res: Res, next: Next) => {
  const { username, password } = req.body;
  const userRepository = getManager().getRepository(Users);
  const user = await userRepository.findOne({ username });

  req.locals.user = user;

  next();
};

export const auth = (req: Req, res: Res, next: Next) => {
  const { username, password } = req.body;
  const { user } = req.locals;
  let handledResult: HandledResult;
  if(user) {
    try {
      const isMatch = bcrypt.compareSync(password, user.password);
      if(isMatch) {
        handledResult = {
          code: CodeMap["成功"],
          data: {
            ssID: req.session.id
          },
          setSession: true,
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
    res.locals.handledResult = handledResult;
  } else {
    handledResult = {
      code: CodeMap["用户名或密码错误"]
    };
  }
  res.locals.handledResult = handledResult;
  next();
};

passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate("local", { session: false });
