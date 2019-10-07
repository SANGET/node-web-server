import { AdminAppConfig } from "@nws/configs/types";

const LocalAdminConfig: AdminAppConfig =  {
  Port: 6677,
  JwtOptions: {
    /** 默认一个小时 */
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 1 * 1),
    secretOrPrivateKey: "adminSecKey",
    headerAuthKey: "authorization",
  }
};

export default LocalAdminConfig;
