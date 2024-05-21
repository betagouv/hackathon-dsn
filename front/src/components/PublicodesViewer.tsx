"use client";
import { publicodesApiUrl, publicodesRulesApiUrl } from "@/utils/constants";
import { PublicodesResult } from "@/utils/types";
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

  return (
    <div className="container">
      {result ? (
        <div>
          <h1>{result.note}/100</h1>
          <div className="fr-table fr-table--bordered fr-mb-2w">
            <table className="table">
              <tbody style={{ width: "100%" }}>
                {Object.keys(result)
                  .filter((k) => k != "note")
                  .map((k, i) => (
                    <>
                      <tr className="table-light" key={k + i}>
                        <th colSpan={2}>{k}</th>
                      </tr>
                      {Object.keys(result[k]).map((k2) => (
                        <tr key={`${k}-${k2}`}>
                          <td>{k2}</td>
                          <td>{result[k][k2]}</td>
                        </tr>
                      ))}
                    </>
                  ))}
              </tbody>
            </table>
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
