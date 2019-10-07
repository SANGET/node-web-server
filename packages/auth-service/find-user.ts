import { getManager } from "typeorm";
import { Users } from "@nws/entities/users";

interface FindOptions {
  username?: string;
  id?: string;
}
const findUser = async (options: FindOptions) => {
  const { username, id } = options;
  const userRepository = getManager().getRepository(Users);
  let user: Users;
  if(id) {
    user = await userRepository.findOne(id);
  } else {
    user = await userRepository.findOne({ username });
  }
  return user;
};

export default findUser;
