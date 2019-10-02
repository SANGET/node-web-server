import { getManager } from "typeorm";

import { Users } from "@nws/entities/users";
import pwHelper from "@nws/utils/pw-helper";

export const register = async (req: Req, res: Res, next: Next) => {
  const { username, password } = req.body;
  const userRepository = getManager().getRepository(Users);
  const user = await userRepository.findOne({ username });
  if(user) {
    res.locals.handledResult = {
      code: 1002,
    };
  } else {
    const newUser = new Users();
    // const newUser = userRepository.create(req.body);
    newUser.username = username;
    newUser.password = await pwHelper(password);
    userRepository.save(newUser);
  }

  res.locals.handledResult = {
    code: 0,
  };
  next();
};
