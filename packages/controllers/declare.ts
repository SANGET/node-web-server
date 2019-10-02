import {
  Response as ExpressRes,
  Request as ExpressReq,
  NextFunction,
} from "express";

import { ApiResponse } from "@nws/res-handler/types/api-response";

declare global {
  interface Res extends ExpressRes {
    locals: {
      handledResult: ApiResponse;
    };
  }
  interface Req extends ExpressReq {
    locals: {

    };
  }
  interface Next extends NextFunction {
    locals: {

    };
  }
} 
