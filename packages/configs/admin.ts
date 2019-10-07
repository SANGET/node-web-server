import fs from "fs";
import path from "path";

import { AdminAppConfig } from "./types";

const LocalConfigFilePath = path.resolve(process.cwd(), ".config.admin.local.ts");

const defaultAdminConfig: AdminAppConfig =  {
  Port: 6677,
  JwtOptions: {
    /** 默认一个小时 */
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 1 * 1),
    secretOrPrivateKey: "adminSecKey",
    headerAuthKey: "authorization",
  }
};
let localConfig;

if(fs.existsSync(LocalConfigFilePath)) {
  localConfig = require(LocalConfigFilePath);
}
const AdminConfig: AdminAppConfig = Object.assign({}, defaultAdminConfig, localConfig);

export default AdminConfig;
