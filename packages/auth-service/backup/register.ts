import { getManager } from "typeorm";

import { Users } from "@nws/entities/users";
import pwHelper from "@nws/utils/pw-helper";
import CodeMap from "@nws/res-handler/res-code-mapper/enum";

export const register = async (req: Req, res: Res, next: Next) => {
  const { username, password } = req.body;
  const userRepository = getManager().getRepository(Users);
  const user = await userRepository.findOne({ username });

  let handledResult: HandledResult;
  if(user) {
    /** 已经被注册了 */
    handledResult = {
      code: CodeMap["该用户已存在"],
    };
  } else {
    const newUser = new Users();
    // const newUser = userRepository.create(req.body);
    newUser.username = username;
    newUser.password = await pwHelper(password);
    userRepository.save(newUser);
    handledResult = {
      code: CodeMap["成功"],
    };
  }

  req.user = handledResult;

  next();
};
