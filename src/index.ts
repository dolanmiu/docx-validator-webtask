import "babel-polyfill";

import * as bodyParser from "body-parser";
import * as Express from "express";
import * as Webtask from "webtask-tools";

import { validate } from "./routes/validate";

const app = Express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

validate(app);

module.exports = Webtask.fromExpress(app);
