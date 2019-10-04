import path from "path";
import { getManager } from "typeorm";

import { Users } from "@nws/entities/users";

export const index = async (req: Req, res: Res, next: Next) => {
  res.json({
    data: "root"
  });
  next();
};
