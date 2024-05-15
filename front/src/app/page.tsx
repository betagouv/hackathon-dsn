"use client";
import * as React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { fr } from "@codegouvfr/react-dsfr";
import { DsfrLayout } from "@/components/DsfrLayout";
import { PublicodesViewer } from "@/components/PublicodesViewer";

const Home: NextPage = () => {
  const [numSiret, setNumSiret] = React.useState<string>("");
  const [hasCompletedSiret, setHasCompletedSiret] =
    React.useState<boolean>(false);

  const onSearch = () => {
    console.log("search", numSiret);
    setHasCompletedSiret(true);
  };
  return (
    <DsfrLayout>
      <Head>
        <title>Egalité professionnelle | beta.gouv.fr</title>
      </Head>

      <div>
        <div>
          <h1>Égalité professionnelle via la DSN</h1>
          <p>
            Bienvenue sur la plateforme de l&apos;égalité professionnelle au
            sein de la DSN.
          </p>
          <p>
            Vous pouvez utiliser cette plateforme pour vérifier qu&apos;une
            entreprise respecte bien l&apos;égalité professionnelle.
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
        {hasCompletedSiret && (
          <>
            <p>
              L&apos;entreprise avec le numéro de SIRET <b>{numSiret}</b> a été
              retrouvée dans la base de données de la <b>DSN</b>
            </p>
            <PublicodesViewer />
          </>
        )}
      </div>
    </DsfrLayout>
  );
};

export default Home;
