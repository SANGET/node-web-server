import { getManager } from "typeorm";
import { Users } from "@nws/entities/users";

interface FindOptions {
  username: string;
  password: string;
  id: string;
}
export const findUser = async (options: FindOptions) => {
  const { username, password } = options;
  const userRepository = getManager().getRepository(Users);
  const user = await userRepository.findOne({ username });

  return user;
};
