import path from "path";
import { getManager } from "typeorm";

import { Users } from "@nws/entities/users";

export const index = async (req: Req, res: Res, next: Next) => {
  // res.sendFile(path.resolve(process.cwd(), "./view/test-login.html"));
  const userRepository = getManager().getRepository(Users);
  const users = await userRepository.find();
  res.locals.handledResult = {
    code: 0,
    data: users
  };
  next();
  // res.json({
  //   data: users
  // });
};
