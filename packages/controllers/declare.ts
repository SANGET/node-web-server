import {
  Response as ExpressRes,
  Request as ExpressReq,
  NextFunction,
} from "express";

declare global {
  /** 统一的 api res 数据结构的定义 */
  interface HandledResult {
    code: number;
    setSession?: any;
    // 接口是否需要验证后操作
    needAuth?: boolean;
    data?: any;
  }
  interface Res extends ExpressRes {
    locals: {
      /** controller 需要按照此格式回应 */
      handledResult: HandledResult;
    };
  }
  interface Req extends ExpressReq {
    locals: {
      isNeedAuth?: boolean;
    };
  }
  interface Next extends NextFunction {
    locals: any;
  }
} 
