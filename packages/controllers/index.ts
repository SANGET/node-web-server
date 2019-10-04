import {
  Router
} from "express";
import { resHandler, unAuthHandler } from "@nws/res-handler";

import * as rootController from "./root";
import * as authController from "./auth";
import * as usersController from "./users";

import "./declare";

import { authJwt } from "./auth/auth-jwt";

const ControllerRouter = Router();

/** 业务处理 */
/** 不需要做验证的 api */
ControllerRouter.get("/", rootController.index);
ControllerRouter.post("/login", authController.login);
// ControllerRouter.post("/check-token", authController.checkToken);
ControllerRouter.post("/register", authController.register);

/** 需要做验证的 api */
ControllerRouter.get("/users", authJwt, usersController.getUsers);

/** 
 * 统一处理 API res 的格式
 * 需要做统一处理的 controller 必须调用 next()
 */
ControllerRouter.use(resHandler);

export default ControllerRouter;
