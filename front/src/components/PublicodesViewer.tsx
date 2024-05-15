"use client";
import React from "react";

export function PublicodesViewer() {
  return (
    <div className="container">
      {/* aFFICHAGE DU SCORE */}
      <p className="fr-title fr-mb-2w">
        Score global pour l'entreprise <b>BOULANGERIE DE PARIS</b>
      </p>
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
            <tr>
              <td>effectifs valides</td>
              <td>43</td>
            </tr>
            <tr>
              <td>écart pondéré</td>
              <td>-2,9&nbsp;%</td>
            </tr>
            <tr>
              <td>calculable</td>
              <td>oui</td>
            </tr>
            <tr>
              <td>indicateur d'écart de rémunération</td>
              <td>2,9&nbsp;%</td>
            </tr>
            <tr>
              <td>note</td>
              <td>37</td>
            </tr>
            <tr class="table-light">
              <th colspan="2">augmentations</th>
            </tr>
            <tr>
              <td>effectifs valides</td>
              <td>43</td>
            </tr>
            <tr>
              <td>écart pondéré</td>
              <td>-5&nbsp;%</td>
            </tr>
            <tr>
              <td>calculable</td>
              <td>oui</td>
            </tr>
            <tr>
              <td>indicateur d'écart d'augmentations</td>
              <td>5&nbsp;%</td>
            </tr>
            <tr>
              <td>note</td>
              <td>10</td>
            </tr>
            <tr class="table-light">
              <th colspan="2">promotions</th>
            </tr>
            <tr>
              <td>effectifs valides</td>
              <td>43</td>
            </tr>
            <tr>
              <td>écart pondéré</td>
              <td>-5&nbsp;%</td>
            </tr>
            <tr>
              <td>calculable</td>
              <td>oui</td>
            </tr>
            <tr>
              <td>indicateur d'écart de promotions</td>
              <td>5&nbsp;%</td>
            </tr>
            <tr>
              <td>note</td>
              <td>10</td>
            </tr>
            <tr class="table-light">
              <th colspan="2">maternité</th>
            </tr>
            <tr>
              <td>calculable</td>
              <td>oui</td>
            </tr>
            <tr>
              <td>indicateur de maternité</td>
              <td>100&nbsp;%</td>
            </tr>
            <tr>
              <td>note</td>
              <td>15</td>
            </tr>
            <tr className="table-light">
              <th colSpan="2">hautes rémunérations</th>
            </tr>
            <tr>
              <td>calculable</td>
              <td>oui</td>
            </tr>
            <tr>
              <td>note</td>
              <td>10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
