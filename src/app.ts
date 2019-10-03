import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";

import Controller from "@nws/controllers";

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  name: "ssid",
  secret: "woxiangkankanshenmedongxi",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

app.use(Controller);

export default app;
