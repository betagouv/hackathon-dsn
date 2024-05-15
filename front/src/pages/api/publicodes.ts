import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import Engine from "publicodes";
import { parse } from "yaml";

type ResponseData = {
  message: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const rules = fs.readFileSync("../../publicodes/modele.yaml").toString();
  const engine = new Engine(parse(rules));
  const situation = {
    "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . hommes": 20000,
    "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . femmes": 23000,
    "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 12,
    "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 8,
    "index . écart rémunérations . ouvriers . de 30 à 39 ans . remunération annuelle brute moyenne par EQTP . hommes": 24000,
    "index . écart rémunérations . ouvriers . de 30 à 39 ans . remunération annuelle brute moyenne par EQTP . femmes": 22000,
    "index . écart rémunérations . ouvriers . de 30 à 39 ans . nombre salariés . hommes": 11,
    "index . écart rémunérations . ouvriers . de 30 à 39 ans . nombre salariés . femmes": 12,
    "index . écart rémunérations . ouvriers . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . hommes": 0,
    "index . écart rémunérations . ouvriers . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . femmes": 0,
    "index . écart rémunérations . ouvriers . de 40 à 49 ans . nombre salariés . hommes": 0,
    "index . écart rémunérations . ouvriers . de 40 à 49 ans . nombre salariés . femmes": 0,
    "index . écart rémunérations . ouvriers . de 50 ans et plus . remunération annuelle brute moyenne par EQTP . hommes": 0,
    "index . écart rémunérations . ouvriers . de 50 ans et plus . remunération annuelle brute moyenne par EQTP . femmes": 0,
    "index . écart rémunérations . ouvriers . de 50 ans et plus . nombre salariés . hommes": 0,
    "index . écart rémunérations . ouvriers . de 50 ans et plus . nombre salariés . femmes": 0,
    "index . écart rémunérations . employés . moins de 30 ans . remunération annuelle brute moyenne par EQTP . hommes": 0,
    "index . écart rémunérations . employés . moins de 30 ans . remunération annuelle brute moyenne par EQTP . femmes": 0,
    "index . écart rémunérations . employés . moins de 30 ans . nombre salariés . hommes": 0,
    "index . écart rémunérations . employés . moins de 30 ans . nombre salariés . femmes": 0,
    "index . écart rémunérations . employés . de 30 à 39 ans . remunération annuelle brute moyenne par EQTP . hommes": 0,
    "index . écart rémunérations . employés . de 30 à 39 ans . remunération annuelle brute moyenne par EQTP . femmes": 0,
    "index . écart rémunérations . employés . de 30 à 39 ans . nombre salariés . hommes": 0,
    "index . écart rémunérations . employés . de 30 à 39 ans . nombre salariés . femmes": 0,
    "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . hommes": 0,
    "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . femmes": 0,
    "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 0,
    "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 0,
    "index . écart rémunérations . employés . de 50 ans et plus . remunération annuelle brute moyenne par EQTP . hommes": 0,
    "index . écart rémunérations . employés . de 50 ans et plus . remunération annuelle brute moyenne par EQTP . femmes": 0,
    "index . écart rémunérations . employés . de 50 ans et plus . nombre salariés . hommes": 0,
    "index . écart rémunérations . employés . de 50 ans et plus . nombre salariés . femmes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . moins de 30 ans . remunération annuelle brute moyenne par EQTP . hommes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . moins de 30 ans . remunération annuelle brute moyenne par EQTP . femmes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . moins de 30 ans . nombre salariés . hommes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . moins de 30 ans . nombre salariés . femmes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . de 30 à 39 ans . remunération annuelle brute moyenne par EQTP . hommes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . de 30 à 39 ans . remunération annuelle brute moyenne par EQTP . femmes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . de 30 à 39 ans . nombre salariés . hommes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . de 30 à 39 ans . nombre salariés . femmes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . hommes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . femmes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . de 40 à 49 ans . nombre salariés . hommes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . de 40 à 49 ans . nombre salariés . femmes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . de 50 ans et plus . remunération annuelle brute moyenne par EQTP . hommes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . de 50 ans et plus . remunération annuelle brute moyenne par EQTP . femmes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . de 50 ans et plus . nombre salariés . hommes": 0,
    "index . écart rémunérations . techniciens et agents de maîtrise . de 50 ans et plus . nombre salariés . femmes": 0,
    "index . écart rémunérations . ingénieurs et cadres . moins de 30 ans . remunération annuelle brute moyenne par EQTP . hommes": 0,
    "index . écart rémunérations . ingénieurs et cadres . moins de 30 ans . remunération annuelle brute moyenne par EQTP . femmes": 0,
    "index . écart rémunérations . ingénieurs et cadres . moins de 30 ans . nombre salariés . hommes": 0,
    "index . écart rémunérations . ingénieurs et cadres . moins de 30 ans . nombre salariés . femmes": 0,
    "index . écart rémunérations . ingénieurs et cadres . de 30 à 39 ans . remunération annuelle brute moyenne par EQTP . hommes": 0,
    "index . écart rémunérations . ingénieurs et cadres . de 30 à 39 ans . remunération annuelle brute moyenne par EQTP . femmes": 0,
    "index . écart rémunérations . ingénieurs et cadres . de 30 à 39 ans . nombre salariés . hommes": 0,
    "index . écart rémunérations . ingénieurs et cadres . de 30 à 39 ans . nombre salariés . femmes": 0,
    "index . écart rémunérations . ingénieurs et cadres . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . hommes": 0,
    "index . écart rémunérations . ingénieurs et cadres . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . femmes": 0,
    "index . écart rémunérations . ingénieurs et cadres . de 40 à 49 ans . nombre salariés . hommes": 0,
    "index . écart rémunérations . ingénieurs et cadres . de 40 à 49 ans . nombre salariés . femmes": 0,
    "index . écart rémunérations . ingénieurs et cadres . de 50 ans et plus . remunération annuelle brute moyenne par EQTP . hommes": 0,
    "index . écart rémunérations . ingénieurs et cadres . de 50 ans et plus . remunération annuelle brute moyenne par EQTP . femmes": 0,
    "index . écart rémunérations . ingénieurs et cadres . de 50 ans et plus . nombre salariés . hommes": 0,
    "index . écart rémunérations . ingénieurs et cadres . de 50 ans et plus . nombre salariés . femmes": 0,

    "index . écart augmentations . ouvriers . hommes": 10,
    "index . écart augmentations . ouvriers . femmes": 15,
    "index . écart augmentations . employés . hommes": 0,
    "index . écart augmentations . employés . femmes": 0,
    "index . écart augmentations . techniciens et agents de maîtrise . hommes": 0,
    "index . écart augmentations . techniciens et agents de maîtrise . femmes": 0,
    "index . écart augmentations . ingénieurs et cadres . hommes": 0,
    "index . écart augmentations . ingénieurs et cadres . femmes": 0,

    "index . écart promotions . ouvriers . hommes": 20,
    "index . écart promotions . ouvriers . femmes": 25,
    "index . écart promotions . employés . hommes": 0,
    "index . écart promotions . employés . femmes": 0,
    "index . écart promotions . techniciens et agents de maîtrise . hommes": 0,
    "index . écart promotions . techniciens et agents de maîtrise . femmes": 0,
    "index . écart promotions . ingénieurs et cadres . hommes": 0,
    "index . écart promotions . ingénieurs et cadres . femmes": 0,

    "index . maternité . nombre total": 10,
    "index . maternité . nombre augmentés": 10,

    "index . hautes rémunérations . femmes": 7,
    "index . hautes rémunérations . hommes": 3,
  };

  engine.setSituation(situation);
  const result = engine.evaluate("json").nodeValue;
  console.log(result);
  res.status(200).json({ message: "Hello World" });
}
