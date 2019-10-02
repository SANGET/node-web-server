import { getManager } from "typeorm";
import bcrypt from "bcrypt";

import { Users } from "@nws/entities/users";
// import pwHelper, { connectPW } from "@nws/utils/pw-helper";

export const login = async (req: Req, res: Res, next: Next) => {
  const { username, password } = req.body;
  const userRepository = getManager().getRepository(Users);
  const user = await userRepository.findOne({ username });
  if(user) {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      let handledResult;
      if(!err && isMatch) {
        handledResult = {
          code: 0
        };
      } else {
        handledResult = {
          code: 1001
        };
      }
      res.locals.handledResult = handledResult;
      next();
    });
  } else {
    res.locals.handledResult = {
      code: 1001
    };
    next();
  }
};
