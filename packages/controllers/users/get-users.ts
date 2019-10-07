import { getManager } from "typeorm";
import { Users } from "@nws/entities/users";
import { ResponseMsgStruct } from "@nws/res-handler";

export const getUsers = [
  async (req: Req, res: Res, next: Next) => {
    const userRepository = getManager().getRepository(Users);
    const users = await userRepository.find();
    res.locals.handledResult = ResponseMsgStruct(0, users);
    next();
  }
];
