"use client";
import * as React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { DsfrLayout } from "@/components/DsfrLayout";
import { PublicodesViewer } from "@/components/PublicodesViewer";

const fakeSituation = {
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

const Home: NextPage = () => {
  const [numSiret, setNumSiret] = React.useState<string>("test");
  const [hasCompletedSiret, setHasCompletedSiret] =
    React.useState<boolean>(true);
  const [situation, setSituation] = React.useState<null | Record<string, any>>(
    fakeSituation
  );

  const onSearch = () => {
    setHasCompletedSiret(true);
    // TODO: récupérer la situation via le numéro de SIRET
    setSituation(fakeSituation);
  };

  return (
    <DsfrLayout>
      <Head>
        <title>Démo égalité professionnelle + DSN | beta.gouv.fr</title>
      </Head>

      <div>
        <div>
          <h1>Égalité professionnelle via la DSN</h1>
          <p>
            Démo du calcul de laapos;index égalité professionnelle depuis la
            DSN.
          </p>
        </div>

        {!hasCompletedSiret && (
          <>
            <p>Veuillez indiquer le numéro de SIRET de l&apos;entreprise</p>
            <input
              className="fr-input"
              type="text"
              id="text-input-text"
              name="text-input-text"
              value={numSiret}
              onChange={(e) => setNumSiret(e.target.value)}
            />
            <button
              className="fr-btn fr-mt-2w"
              type="button"
              onClick={onSearch}
            >
              Rechercher
            </button>
          </>
        )}
        {hasCompletedSiret && situation && (
          <>
            <p>
              L&apos;entreprise avec le numéro de SIRET <b>{numSiret}</b> a été
              retrouvée dans la base de données de la <b>DSN</b>
            </p>
            <PublicodesViewer situation={situation} />
            <p className="fr-mt-2w">
              Pour information,{" "}
              <a
                href="https://egapro.travail.gouv.fr/aide-simulation"
                target="_blank"
              >
                c&apos;est ici où figure l&apos;algorithme utilisé pour le
                calcul
              </a>
            </p>
          </>
        )}
      </div>
    </DsfrLayout>
  );
};

export default Home;
