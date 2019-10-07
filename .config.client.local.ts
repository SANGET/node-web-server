import { ClientAppConfig } from "@nws/configs/types";

const LocalClientConfig: ClientAppConfig =  {
  Port: 5566,
  JwtOptions: {
    /** 用户默认 24 小时 */
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 1),
    secretOrPrivateKey: "clientSecKey",
    headerAuthKey: "authorization",
  }
};

export default LocalClientConfig;
