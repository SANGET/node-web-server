import {
  Router
} from "express";
import * as rootController from "./root";
import * as authController from "./auth";
import { resHandler } from "@nws/res-handler";

import "./declare";

const ControllerRouter = Router();

/** 业务处理 */
ControllerRouter.get("/", rootController.index);
ControllerRouter.post("/login", authController.login);
ControllerRouter.post("/register", authController.register);

/** 
 * 统一处理 API res 的格式
 * 需要做统一处理的 controller 必须调用 next()
 */
ControllerRouter.use(resHandler);

export default ControllerRouter;
