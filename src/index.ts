import "reflect-metadata";
import { createConnection } from "typeorm";

import errorHandler from "errorhandler";

import app from "./app";
import ClientConfig from "@nws/configs/client";
// import { CMSPort } from "@nws/configs";

createConnection().then(() => {
  /**
   * Error Handler. Provides full stack - remove for production
   */
  app.use(errorHandler());

  /**
   * Start Express server.
   */
  app.listen(ClientConfig, () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      ClientConfig,
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });
}).catch(error => console.log(error));
