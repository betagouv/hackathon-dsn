"use client";
import { publicodesApiUrl, publicodesRulesApiUrl } from "@/constants";
import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { parse, stringify } from "yaml";

type Props = {
  situation: Record<string, any>;
};

export function PublicodesViewer({ situation }: Props) {
  const [result, setResult] = React.useState<any>(null);

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
      setResult(r);
    });
  }, [situation]);

  const explainTrigger = async () => {
    const rules = await fetch(publicodesRulesApiUrl).then((r) => r.json());

    const jsonRules = {
      ...parse(rules),
      ...situation,
    };
    situation;
    const yamlRules = stringify(jsonRules);

    const url = `https://publi.codes/studio/index/note#${encodeURIComponent(
      yamlRules
    )}`;

    window.open(url);
  };
  return (
    <div className="container">
      {/* aFFICHAGE DU SCORE */}
      <p className="fr-title fr-mb-2w">
        Score global pour l&apos;entreprise <b>BOULANGERIE DE PARIS</b>
      </p>
      {result ? (
        <>
          <h1>92/100 🔥</h1>
          <div className="fr-table fr-table--bordered fr-mb-2w">
            <table className="table">
              <tbody style={{ width: "100%" }}>
                <tr className="table-light">
                  <th colSpan={2}>rémunérations</th>
                </tr>
                <tr>
                  <td>effectifs</td>
                  <td>43</td>
                </tr>
              </tbody>
            </table>
            <button className="fr-btn fr-mt-2w" onClick={explainTrigger}>
              Détail des calculs
            </button>
          </div>
        </>
      ) : (
        <>
          <p>Calcul en cours...</p>
          <CircularProgress />
        </>
      )}
    </div>
  );
}
