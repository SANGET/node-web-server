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
app.use(cors({
  // credentials: true, 
  // origin: "http://127.0.0.1:3000"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  name: "ssid",
  secret: "woxiangkankanshenmedongxi",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}));

app.use(Controller);

export default app;
