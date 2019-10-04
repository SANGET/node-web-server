import {
  Router
} from "express";
import { resHandler, unAuthHandler } from "@nws/res-handler";
import jwt from "express-jwt";

import * as rootController from "./root";
import * as authController from "./auth";
import * as usersController from "./users";

import "./declare";

const ControllerRouter = Router();

const checkAuth = [
  // jwt({secret: "shhhhhhared-secret"}),
  (req: Req, res: Res, next: Next) => {
    // console.log(req.session.id, req.headers.ssid, req.session.username);
    // console.log(req.headers.ssid);
    if(req.session.username && req.session.id === req.headers.ssid) {
      res.status(200);
      next();
    } else {
      return unAuthHandler(res);
    }
  },
];

const setReq = (req: Req, res: Res, next: Next) => {
  if(!req.locals) req.locals = {};
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
};

/** 设置 req 的 locals 字段 */
ControllerRouter.use(setReq);

/** 业务处理 */
/** 不需要做验证的 api */
ControllerRouter.get("/", rootController.index);
ControllerRouter.post("/login", authController.login);
ControllerRouter.post("/register", authController.register);

/** 需要做验证的 api */
ControllerRouter.get("/users", checkAuth, usersController.getUsers);

/** 
 * 统一处理 API res 的格式
 * 需要做统一处理的 controller 必须调用 next()
 */
ControllerRouter.use(resHandler);

export default ControllerRouter;
