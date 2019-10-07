import { CodeCN } from "./res-code-mapper";
import CodeMap from "@nws/res-handler/res-code-mapper/enum";

/**
 * 统一返回的信息结构
 * @param resCode 返回的 code
 * @param data 返回的 data
 */
export const ResponseMsgStruct = (resCode: number, data?: any, message?: string) => {
  return {
    code: resCode,
    message: message || CodeCN[resCode],
    data
  };
};

export const unAuthHandler = (res: Res) => {
  const errCode = CodeMap["未授权的操作"];
  res.status(401).json(ResponseMsgStruct(errCode));
};
export const resHandler = (req: Req, res: Res, next: Next) => {
  const { handledResult } = res.locals;
  let resData = {};
  if(!handledResult) {
    const code = CodeMap["警告，有未处理的 api"];
    resData = ResponseMsgStruct(code);
  } else {
    const { code = 9999, data } = handledResult;
    resData = ResponseMsgStruct(code, data);
    res.json(resData);
  }
  next();
};
