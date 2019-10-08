import fs from "fs";
import path from "path";

import { ClientAppConfig } from "./types";

const defaultClientConfig: ClientAppConfig =  {
  Port: 5566,
  JwtOptions: {
    /** 默认一个小时 */
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 1 * 1),
    secretOrPrivateKey: "clientSecKey",
    headerAuthKey: "authorization",
  }
};

const LocalConfigFilePath = path.resolve(process.cwd(), ".config.client.local.ts");
let localConfig;

if(fs.existsSync(LocalConfigFilePath)) {
  localConfig = require(LocalConfigFilePath).default;
}

const ClientConfig: ClientAppConfig = Object.assign({}, defaultClientConfig, localConfig);

export default ClientConfig;
