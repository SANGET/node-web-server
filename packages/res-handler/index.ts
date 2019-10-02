import { CodeCN } from "./res-code-mapper";

export const resHandler = (req: Req, res: Res) => {
  const { code = 9999, data } = res.locals.handledResult;
  const resData = {
    code,
    message: CodeCN[`${code}`],
    data
  };
  res.json(resData);
};
