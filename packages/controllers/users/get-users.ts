import { getManager } from "typeorm";
import { Users } from "@nws/entities/users";

export const getUsers = [
  async (req: Req, res: Res, next: Next) => {
    const userRepository = getManager().getRepository(Users);
    const users = await userRepository.find();
    req.user = {
      code: 0,
      data: users
    };
    next();
  }
];
