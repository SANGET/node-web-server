import { CodeCN } from "./res-code-mapper";
import CodeMap from "@nws/res-handler/res-code-mapper/enum";

export const unAuthHandler = (res: Res) => {
  const errCode = CodeMap["未授权的操作"];
  res.status(401).json({
    code: errCode,
    message: CodeCN[errCode],
  });
};
export const resHandler = (req: Req, res: Res, next: Next) => {
  // const handledResult = req.user;
  // console.log(req.user);
  const { handledResult } = res.locals;
  let resData = {};
  if(!handledResult) {
    // const code = CodeMap["警告，有未处理的 api"];
    // resData = {
    //   code,
    //   message: CodeCN[`${code}`],
    // };
  } else {
    const { code = 9999, data } = handledResult;
    resData = {
      code,
      message: CodeCN[`${code}`],
      data
    };
    res.json(resData);
  }
  next();
};
