"use client";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { fr } from "@codegouvfr/react-dsfr";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { SkipLinks } from "@codegouvfr/react-dsfr/SkipLinks";

import Head from "next/head";

const brandTop = (
  <>
    République
    <br />
    Française
  </>
);

const homeLinkPops = {
  href: "/",
  title: "Accueil",
};

export const DsfrLayout = ({ children }: { children: any }) => {
  const path = window.location.pathname;
  return (
    <div>
      <Head>
        <title>Egalité professionnelle | DSN</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Égalité professionnelle" />
      </Head>
      <SkipLinks
        links={[
          {
            anchor: "#fr-header-main-navigation",
            label: "Menu",
          },
          {
            anchor: "#content",
            label: "Contenu",
          },
          {
            anchor: "#fr-footer",
            label: "Pied de page",
          },
        ]}
      />
      <Header
        brandTop={brandTop}
        serviceTitle="Egapro DSN"
        serviceTagline="Hackathon 2024 de la DSN"
        homeLinkProps={homeLinkPops}
        navigation={[
          {
            text: "Accueil",
            linkProps: {
              href: "/",
            },
            isActive: path === "/",
          },
        ]}
        quickAccessItems={[headerFooterDisplayItem]}
      />
      <div
        className={fr.cx("fr-container", "fr-container--fluid", "fr-p-5w")}
        id="content"
      >
        {children}
      </div>
      <Footer
        brandTop={brandTop}
        accessibility="non compliant"
        contentDescription={`Pour l'égalité professionnelle au sein de la DSN`}
        homeLinkProps={homeLinkPops}
        license={`Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont proposés sous licence`}
        accessibilityLinkProps={{ href: "/accessibilite" }}
        termsLinkProps={{ href: "/mentions-legales" }}
        bottomItems={[headerFooterDisplayItem]}
      />
    </div>
  );
};
