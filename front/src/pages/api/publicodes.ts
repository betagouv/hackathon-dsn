import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import Engine, { Evaluation } from "publicodes";
import { parse } from "yaml";
import { publicodesPath } from "@/utils/constants";

type ResponseData = {
  result: Evaluation<any>;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const rules = fs.readFileSync(publicodesPath).toString();
  const engine = new Engine(parse(rules));
  engine.setSituation(req.body.situation);
  const result = engine.evaluate("json").nodeValue;
  res.status(200).json({ result });
}
