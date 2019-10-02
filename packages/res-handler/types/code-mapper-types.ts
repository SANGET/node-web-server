/**
 * 定义业务代码规则
 * 这里代表不是 http 状态码
 * -----------------------
 * 以下为具体定义
 * 0 成功
 * 1- 用户验证问题
 * 2- 客户端参数问题
 * 3- 服务端异常
 * 4- 业务异常
 */
export type CodeMapper = {
  [code: string]: string;
}
