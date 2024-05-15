"use client";
import { publicodesApiUrl, publicodesRulesApiUrl } from "@/constants";
import { PublicodesResult } from "@/types";
import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { parse, stringify } from "yaml";

type Props = {
  situation: Record<string, any>;
};

export function PublicodesViewer({ situation }: Props) {
  const [result, setResult] = React.useState<PublicodesResult | null>(null);

  const callPublicodes = (situation: Record<string, any>) =>
    fetch(publicodesApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        situation,
      }),
    }).then((r) => r.json());

  useEffect(() => {
    callPublicodes(situation).then((r) => {
      const res = r.result;
      setResult(JSON.parse(res));
    });
  }, [situation]);

  const explainTrigger = async () => {
    const res = await fetch(publicodesRulesApiUrl).then((r) => r.json());

    const jsonRules = {
      ...parse(res.rules),
      ...situation,
    };

    const yamlRules = stringify(jsonRules);

    const url = `https://publi.codes/studio/index/note#${encodeURIComponent(
      yamlRules
    )}`;

    window.open(url);
  };

  const generateSmileyFromNote = (note: number) => {
    if (note < 50) {
      return "😢";
    } else if (note < 60) {
      return "😕";
    } else if (note < 70) {
      return "😐";
    } else if (note < 80) {
      return "🙂";
    } else if (note < 90) {
      return "😀";
    } else {
      return "🔥";
    }
  };
  return (
    <div className="container">
      {result ? (
        <div>
          <h1>
            Score global : {parseInt(result.note)}{" "}
            {generateSmileyFromNote(parseInt(result.note))}
          </h1>
          <div>
            <div className="fr-table fr-table--bordered fr-mb-2w">
              <table>
                <caption>Rémunérations</caption>
                <thead>
                  <tr>
                    <th scope="col">Effectifs</th>
                    <th scope="col">Effectifs Valides</th>
                    <th scope="col">Écart pondéré</th>
                    <th scope="col">Indicateur d&apos;écart de rémunération</th>
                    <th scope="col">Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{result.rémunérations.effectifs}</td>
                    <td>{result.rémunérations["effectifs valides"]}</td>
                    <td>{result.rémunérations["écart pondéré"]}</td>
                    <td>
                      {
                        result.rémunérations[
                          "indicateur d'écart de rémunération"
                        ]
                      }
                    </td>
                    <td>{result.rémunérations.note}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="fr-table fr-table--bordered fr-mb-2w">
              <table>
                <caption>Augmentation</caption>
                <thead>
                  <tr>
                    <th scope="col">Effectifs valides</th>
                    <th scope="col">Écart pondéré</th>
                    <th scope="col">Calculable</th>
                    <th scope="col">
                      Indicateur d&apos;écart d&apos;augmentation
                    </th>
                    <th scope="col">Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{result.augmentations["effectifs valides"]}</td>
                    <td>{result.augmentations["écart pondéré"]}</td>
                    <td>{result.augmentations["calculable"]}</td>
                    <td>
                      {
                        result.augmentations[
                          "indicateur d'écart d'augmentations"
                        ]
                      }
                    </td>
                    <td>{result.augmentations["note"]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="fr-table fr-table--bordered fr-mb-2w">
              <table>
                <caption>Promotions</caption>
                <thead>
                  <tr>
                    <th scope="col">Effectifs valides</th>
                    <th scope="col">Écart pondéré</th>
                    <th scope="col">Calculable</th>
                    <th scope="col">Indicateur d&apos;écart de promotions</th>
                    <th scope="col">Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{result.promotions["effectifs valides"]}</td>
                    <td>{result.promotions["écart pondéré"]}</td>
                    <td>{result.promotions["calculable"]}</td>
                    <td>
                      {result.promotions["indicateur d'écart de promotions"]}
                    </td>
                    <td>{result.promotions["note"]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="fr-table fr-table--bordered fr-mb-2w">
              <table>
                <caption>Maternité</caption>
                <thead>
                  <tr>
                    <th scope="col">Calculable</th>
                    <th scope="col">Indicateur de maternité</th>
                    <th scope="col">Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{result.maternité["calculable"]}</td>
                    <td>{result.maternité["indicateur de maternité"]}</td>
                    <td>{result.maternité["note"]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="fr-table fr-table--bordered fr-mb-2w">
              <table>
                <caption>Hautes rémunérations</caption>
                <thead>
                  <tr>
                    <th scope="col">Calculable</th>
                    <th scope="col">Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{result["hautes rémunérations"]["calculable"]}</td>
                    <td>{result["hautes rémunérations"]["note"]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="fr-btn fr-mt-2w" onClick={explainTrigger}>
              Détail des calculs
            </button>
          </div>
        </div>
      ) : (
        <>
          <p>Calcul en cours...</p>
          <CircularProgress />
        </>
      )}
    </div>
  );
}
