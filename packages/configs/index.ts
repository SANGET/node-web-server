import fs from "fs";
import path from "path";

import { NWSConfig, AdminAppConfig, ClientAppConfig } from "./types";


const defaultClientConfig: ClientAppConfig =  {
  Port: 5566,
  JwtOptions: {
    /** 默认一个小时 */
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 1 * 1),
    secretOrPrivateKey: "clientSecKey",
    headerAuthKey: "authorization",
  }
};

const defaultConfig: NWSConfig = {
  AdminAppConfig: defaultAdminConfig,
  ClientAppConfig: defaultClientConfig,
};

const LocalConfigFilePath = path.resolve(process.cwd(), ".config.local.ts");
let localConfig;

if(fs.existsSync(LocalConfigFilePath)) {
  localConfig = require(LocalConfigFilePath);
}

const Config: NWSConfig = Object.assign({}, defaultConfig, localConfig);

export default Config;
