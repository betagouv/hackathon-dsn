import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { publicodesPath } from "@/utils/constants";

type ResponseData = {
  rules: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const rules = fs.readFileSync(publicodesPath).toString();
  res.status(200).json({ rules });
}
