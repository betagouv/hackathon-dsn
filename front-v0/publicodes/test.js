/* eslint-env node18 */
import fs from "fs";
import yaml from "yaml";
import Engine, { formatValue } from "publicodes";

const rules = yaml.parse(fs.readFileSync("./publicodes.yaml").toString());

console.log(rules);

test("a besoin de variables pour fonctionner", () => {
  const engine = new Engine(rules);
  const evaluated = engine.evaluate("résultat");
  expect(evaluated.missingVariables).toMatchSnapshot();
});

const defaultSituation = {};

test("ne renvoie pas d'alerte avec la situation par défaut", () => {
  const engine = new Engine(rules);
  engine.setSituation(defaultSituation);
  const evaluated = engine.evaluate("résultat");
  expect(evaluated.nodeValue).toMatchSnapshot();
  expect(evaluated.missingVariables).toEqual({});
});

const testsRemunerations = [
  {
    title: "options . seuil de pertinence par défaut",
    situation: {
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . hommes": 42,
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . femmes": 48,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 40,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 30,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . hommes": 99,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . femmes": 66,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 72,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 30,
    },
    expected: {
      "index . écart rémunérations . effectifs . valides": "172",
      "index . écart rémunérations . ouvriers . moins de 30 ans . écart rémunération":
        "-14,3\u00A0%",
      "index . écart rémunérations . ouvriers . moins de 30 ans . écart rémunération . abs":
        "14,3\u00A0%",
      "index . écart rémunérations . ouvriers . moins de 30 ans . écart rémunération . pertinent":
        "-9,3\u00A0%",
      "index . écart rémunérations . ouvriers . moins de 30 ans . écart pondéré":
        "-3,8\u00A0%",
      "index . écart rémunérations . écart pondéré": "13\u00A0%",
      "index . écart rémunérations . indice écart rémunérations": "13\u00A0%",
      "index . écart rémunérations . note": "21",
    },
  },
  {
    title: "options . seuil de pertinence: 1%",
    situation: {
      "options . seuil de pertinence": 1,
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . hommes": 42,
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . femmes": 48,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 40,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 30,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . hommes": 99,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . femmes": 66,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 72,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 30,
    },
    expected: {
      "index . écart rémunérations . indice écart rémunérations": "13,8\u00A0%",
      "index . écart rémunérations . note": "19",
    },
  },
  {
    title: "exemple 1",
    situation: {
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . hommes": 42,
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . femmes": 48,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 40,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 30,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . hommes": 66,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . femmes": 99,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 72,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 30,
    },
    expected: {
      "index . écart rémunérations . effectifs . valides": "172",
      "index . écart rémunérations . indice écart rémunérations": "30,5\u00A0%",
      "index . écart rémunérations . note": "0",
    },
  },
  {
    title: "exemple 2",
    situation: {
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . hommes": 42,
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . femmes": 48,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 40,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 30,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . hommes": 66,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . femmes": 99,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 72,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 30,
      "index . écart rémunérations . employés . de 50 ans et plus . remunération annuelle brute moyenne par EQTP . hommes": 20,
      "index . écart rémunérations . employés . de 50 ans et plus . remunération annuelle brute moyenne par EQTP . femmes": 30,
      "index . écart rémunérations . employés . de 50 ans et plus . nombre salariés . hommes": 40,
      "index . écart rémunérations . employés . de 50 ans et plus . nombre salariés . femmes": 50,
    },
    expected: {
      "index . écart rémunérations . effectifs . valides": "262",
      "index . écart rémunérations . indice écart rémunérations": "35,5\u00A0%",
      "index . écart rémunérations . note": "0",
    },
  },
  {
    title: "exemple 3 : groupes invalides",
    situation: {
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . hommes": 42,
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . femmes": 48,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 40,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 30,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . hommes": 66,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . femmes": 99,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 2,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 30,
    },
    expected: {
      "index . écart rémunérations . effectifs . valides": "70",
      "index . écart rémunérations . ouvriers . moins de 30 ans . écart rémunération":
        "-14,3\u00A0%",
      "index . écart rémunérations . ouvriers . moins de 30 ans . écart rémunération . abs":
        "14,3\u00A0%",
      "index . écart rémunérations . ouvriers . moins de 30 ans . écart rémunération . pertinent":
        "-9,3\u00A0%",
      "index . écart rémunérations . ouvriers . moins de 30 ans . écart pondéré":
        "-9,3\u00A0%",
      "index . écart rémunérations . écart pondéré": "-9,3\u00A0%",
      "index . écart rémunérations . indice écart rémunérations": "9,3\u00A0%",
      "index . écart rémunérations . note": "27",
    },
  },
  {
    title: "exemple 4",
    situation: {
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . hommes": 42,
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . femmes": 48,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 40,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 30,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . hommes": 99,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . femmes": 88,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 72,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 30,
    },
    expected: {
      "index . écart rémunérations . effectifs . valides": "172",
      "index . écart rémunérations . ouvriers . moins de 30 ans . écart rémunération":
        "-14,3\u00A0%",
      "index . écart rémunérations . ouvriers . moins de 30 ans . écart pondéré":
        "-3,8\u00A0%",
      "index . écart rémunérations . écart pondéré": "-0,2\u00A0%",
      "index . écart rémunérations . indice écart rémunérations": "0,2\u00A0%",
      "index . écart rémunérations . note": "39",
    },
  },
];

const testsAugmentations = [
  {
    title: "test 1",
    situation: {
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 40,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 30,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 72,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 30,
      "index . écart augmentations . ouvriers . hommes": 20,
      "index . écart augmentations . ouvriers . femmes": 30,
      "index . écart augmentations . employés . hommes": 30,
      "index . écart augmentations . employés . femmes": 10,
    },
    expected: {
      "index . écart augmentations . effectifs . valides": "172",
      "index . écart augmentations . ouvriers . écart pondéré": "-4,07\u00A0%",
      "index . écart augmentations . employés . écart pondéré": "11,86\u00A0%",
      "index . écart augmentations . écart pondéré": "7,79\u00A0%",
      "index . écart augmentations . calculable": "oui",
      "index . écart augmentations . indice écart augmentations": "7,79\u00A0%",
      "index . écart augmentations . note": "5",
    },
  },
  {
    title: "test 2",
    situation: {
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 4,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 3,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 72,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 30,
      "index . écart augmentations . ouvriers . hommes": 20,
      "index . écart augmentations . ouvriers . femmes": 30,
      "index . écart augmentations . employés . hommes": 30,
      "index . écart augmentations . employés . femmes": 10,
    },
    expected: {
      "index . écart augmentations . calculable": "oui",
      "index . écart augmentations . indice écart augmentations": "20\u00A0%",
      "index . écart augmentations . note": "0",
    },
  },
  {
    title: "test 3 : non calculable",
    situation: {
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 4,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 3,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 7,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 30,
      "index . écart augmentations . ouvriers . hommes": 20,
      "index . écart augmentations . ouvriers . femmes": 30,
      "index . écart augmentations . employés . hommes": 30,
      "index . écart augmentations . employés . femmes": 10,
    },
    expected: {
      "index . écart augmentations . calculable": "non",
      "index . écart augmentations . indice écart augmentations": "0\u00A0%",
      "index . écart augmentations . note": "Non applicable",
    },
  },
];

const testsPromotions = [
  {
    title: "test 1",
    situation: {
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 40,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 30,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 72,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 30,
      "index . écart promotions . ouvriers . hommes": 20,
      "index . écart promotions . ouvriers . femmes": 30,
      "index . écart promotions . employés . hommes": 30,
      "index . écart promotions . employés . femmes": 20,
    },
    expected: {
      "index . écart promotions . effectifs . valides": "172",
      "index . écart promotions . ouvriers . écart pondéré": "-4,07\u00A0%",
      "index . écart promotions . employés . écart pondéré": "5,93\u00A0%",
      "index . écart promotions . écart pondéré": "1,86\u00A0%",
      "index . écart promotions . calculable": "oui",
      "index . écart promotions . indice écart promotions": "1,86\u00A0%",
      "index . écart promotions . note": "15",
    },
  },
];

const testsMaternité = [
  {
    title: "test 1",
    situation: {
      "index . maternité . nombre total": 40,
      "index . maternité . nombre augmentés": 30,
    },
    expected: {
      "index . maternité . calculable": "oui",
      "index . maternité . indice augmentations": "75\u00A0%",
      "index . maternité . note": "0",
    },
  },
  {
    title: "test 2",
    situation: {
      "index . maternité . nombre total": 0,
      "index . maternité . nombre augmentés": 30,
    },
    expected: {
      "index . maternité . calculable": "non",
      "index . maternité . indice augmentations": "0\u00A0%",
      "index . maternité . note": "Non applicable",
    },
  },
  {
    title: "test 3",
    situation: {
      "index . maternité . nombre total": 30,
      "index . maternité . nombre augmentés": 30,
    },
    expected: {
      "index . maternité . calculable": "oui",
      "index . maternité . indice augmentations": "100\u00A0%",
      "index . maternité . note": "15",
    },
  },
];

const testsHautesRémunérations = [
  {
    title: "test 1",
    situation: {
      "index . hautes rémunérations . femmes": 5,
      "index . hautes rémunérations . hommes": 5,
    },
    expected: {
      "index . hautes rémunérations . calculable": "oui",
      "index . hautes rémunérations . note": "10",
    },
  },
  {
    title: "test 2",
    situation: {
      "index . hautes rémunérations . femmes": 2,
      "index . hautes rémunérations . hommes": 5,
    },
    expected: {
      "index . hautes rémunérations . calculable": "non",
      "index . hautes rémunérations . note": "Non applicable",
    },
  },
  {
    title: "test 3",
    situation: {
      "index . hautes rémunérations . femmes": 2,
      "index . hautes rémunérations . hommes": 8,
    },
    expected: {
      "index . hautes rémunérations . calculable": "oui",
      "index . hautes rémunérations . note": "5",
    },
  },
];

const testsNote = [
  {
    title: "test 1",
    situation: {
      "index . hautes rémunérations . femmes": 5,
      "index . hautes rémunérations . hommes": 5,
    },
    expected: {
      "index . note": "10",
    },
  },
  {
    title: "test 2",
    situation: {
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . hommes": 42,
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . femmes": 48,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 40,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 30,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . hommes": 99,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . femmes": 66,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 72,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 30,
      "index . écart augmentations . ouvriers . hommes": 20,
      "index . écart augmentations . ouvriers . femmes": 30,
      "index . écart augmentations . employés . hommes": 30,
      "index . écart augmentations . employés . femmes": 10,
      "index . écart promotions . ouvriers . hommes": 20,
      "index . écart promotions . ouvriers . femmes": 30,
      "index . écart promotions . employés . hommes": 30,
      "index . écart promotions . employés . femmes": 20,
      "index . maternité . nombre total": 40,
      "index . maternité . nombre augmentés": 30,
      "index . hautes rémunérations . femmes": 2,
      "index . hautes rémunérations . hommes": 8,
    },
    expected: {
      "index . note": "46",
    },
  },
  {
    title: "test 2",
    situation: {
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . hommes": 42,
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . femmes": 48,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 40,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 30,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . hommes": 99,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . femmes": 66,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 72,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 30,
      "index . écart augmentations . ouvriers . hommes": 20,
      "index . écart augmentations . ouvriers . femmes": 30,
      "index . écart augmentations . employés . hommes": 30,
      "index . écart augmentations . employés . femmes": 10,
      "index . écart promotions . ouvriers . hommes": 20,
      "index . écart promotions . ouvriers . femmes": 30,
      "index . écart promotions . employés . hommes": 30,
      "index . écart promotions . employés . femmes": 20,
      "index . maternité . nombre total": 40,
      "index . maternité . nombre augmentés": 30,
      "index . hautes rémunérations . femmes": 5,
      "index . hautes rémunérations . hommes": 5,
    },
    expected: {
      "index . note": "51",
    },
  },
  {
    title: "test 3",
    situation: {
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . hommes": 42,
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . femmes": 48,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 40,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 30,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . hommes": 99,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . femmes": 88,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 72,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 30,
      "index . écart augmentations . ouvriers . hommes": 20,
      "index . écart augmentations . ouvriers . femmes": 30,
      "index . écart augmentations . employés . hommes": 30,
      "index . écart augmentations . employés . femmes": 30,
      "index . écart promotions . ouvriers . hommes": 20,
      "index . écart promotions . ouvriers . femmes": 30,
      "index . écart promotions . employés . hommes": 30,
      "index . écart promotions . employés . femmes": 20,
      "index . maternité . nombre total": 40,
      "index . maternité . nombre augmentés": 30,
      "index . hautes rémunérations . femmes": 5,
      "index . hautes rémunérations . hommes": 5,
    },
    expected: {
      "index . écart rémunérations . note": 39,
      "index . écart augmentations . note": 10,
      "index . écart promotions . note": 15,
      "index . maternité . note": 0,
      "index . hautes rémunérations . note": 10,
      "index . note": "74",
    },
  },
  {
    title: "test 4",
    situation: {
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . hommes": 42,
      "index . écart rémunérations . ouvriers . moins de 30 ans . remunération annuelle brute moyenne par EQTP . femmes": 48,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . hommes": 40,
      "index . écart rémunérations . ouvriers . moins de 30 ans . nombre salariés . femmes": 30,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . hommes": 99,
      "index . écart rémunérations . employés . de 40 à 49 ans . remunération annuelle brute moyenne par EQTP . femmes": 88,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . hommes": 72,
      "index . écart rémunérations . employés . de 40 à 49 ans . nombre salariés . femmes": 30,
      "index . écart augmentations . ouvriers . hommes": 20,
      "index . écart augmentations . ouvriers . femmes": 30,
      "index . écart augmentations . employés . hommes": 30,
      "index . écart augmentations . employés . femmes": 10,
      "index . écart promotions . ouvriers . hommes": 20,
      "index . écart promotions . ouvriers . femmes": 30,
      "index . écart promotions . employés . hommes": 30,
      "index . écart promotions . employés . femmes": 20,
      "index . maternité . nombre total": 40,
      "index . maternité . nombre augmentés": 30,
      "index . hautes rémunérations . femmes": 5,
      "index . hautes rémunérations . hommes": 5,
    },
    expected: {
      "index . écart rémunérations . note": 39,
      "index . écart augmentations . note": 20,
      "index . écart promotions . note": 15,
      "index . maternité . note": 0,
      "index . hautes rémunérations . note": 10,
      "index . note": "84",
    },
  },
];

const runTests = (name, testsArray) => {
  test.each(testsArray)(`${name}: $title`, ({ situation, expected }) => {
    const engine = new Engine(rules);
    engine.setSituation({
      ...defaultSituation,
      ...situation,
    });
    Object.keys(expected).forEach((key) => {
      const evaluated = engine.evaluate(key);
      expect(`${key}: ${formatValue(evaluated)}`).toEqual(
        `${key}: ${expected[key]}`
      );
    });
  });
};

runTests("testsRemunerations", testsRemunerations);
runTests("testsAugmentations", testsAugmentations);
runTests("testsPromotions", testsPromotions);
runTests("testsMaternité", testsMaternité);
runTests("testsHautesRémunérations", testsHautesRémunérations);
runTests("testsNote", testsNote);
