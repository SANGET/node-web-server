import { getManager } from "typeorm";
import bcrypt from "bcrypt";

import { Users } from "@nws/entities/users";
import CodeMap from "@nws/res-handler/res-code-mapper/enum";

export const login = async (req: Req, res: Res, next: Next) => {
  const { username, password } = req.body;
  const userRepository = getManager().getRepository(Users);
  const user = await userRepository.findOne({ username });
  if(user) {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      let handledResult: HandledResult;
      if(!err && isMatch) {
        handledResult = {
          code: CodeMap["成功"],
          setSession: true,
        };
        req.session.username = username;
      } else {
        handledResult = {
          code: CodeMap["用户名或密码错误"]
        };
      }
      res.locals.handledResult = handledResult;
      next();
    });
  } else {
    res.locals.handledResult = {
      code: CodeMap["用户名或密码错误"]
    };
    next();
  }
};
