import {
  Router, Express
} from "express";
import { resHandler, unAuthHandler } from "@nws/res-handler";
import { authJWT } from "@nws/auth-service/auth-jwt";
import ClientConfig from "@nws/configs/client";

import * as rootController from "./root";
import * as clientController from "./client";
import * as usersController from "./users";

import "./declare";

const Controller = (expressApp: Express) => {
  const ControllerRouter = Router();

  /** 客户端的验证 middleware */
  const clientAuthJwt = authJWT(ClientConfig.JwtOptions);

  /** 业务处理 */
  /** 不需要做验证的 api */
  ControllerRouter.get("/", rootController.index);
  ControllerRouter.post("/login", clientController.login);
  ControllerRouter.post("/register", clientController.register);
  
  /** 需要做验证的 api */
  ControllerRouter.get("/users", clientAuthJwt, usersController.getUsers);
  
  /** 
   * 统一处理 API res 的格式
   * 需要做统一处理的 controller 必须调用 next()
   */
  ControllerRouter.use(resHandler);

  expressApp.use(ControllerRouter);
};

export default Controller;
