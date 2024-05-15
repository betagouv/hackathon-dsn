import fs from "fs";
import cors from "@koa/cors";
import Router from "@koa/router";
import { koaMiddleware as publicodesAPI } from "@publicodes/api";
import Koa from "koa";
import Engine from "publicodes";
import { parse } from "yaml";
import staticServe from "koa-static";

const rules = fs.readFileSync("./publicodes.yaml").toString();

const app = new Koa();
const router = new Router();

app.use(cors());

const apiRoutes = publicodesAPI(new Engine(parse(rules)));

router.use(apiRoutes);
app.use(router.routes());
app.use(staticServe("./static", {}));
app.use(router.allowedMethods());

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("listening on port:", port);
});
