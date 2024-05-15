import fs from "fs";
import Engine from "publicodes";
import { parse } from "yaml";

import situation from "./sample-situation.json" assert { type: "json" };

const rules = fs.readFileSync("./publicodes.yaml").toString();
const engine = new Engine(parse(rules));

//const situation = {};
engine.setSituation(situation);
console.log(engine.evaluate("json").nodeValue);
