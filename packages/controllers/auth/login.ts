import { authLocal } from "./auth";

const reqValify = async (req: Req, res: Res, next: Next) => {
  const { username, password } = req.body;
  if(true) {
    /** TODO: 需要实现用户名的验证 */
    next();
  }
};

export const login = [
  reqValify,
  // findUser,
  authLocal,
];
