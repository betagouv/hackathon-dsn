# 💃 Index EgaPro 🕺

Dépôt pour le Hackathon DSN organisé par la Direction interministérielle du numérique.

### Description

Toutes les entreprises de plus 50 salariés (>40k) doivent déclarer annuellement leur index d'égalité professionnelle, ce qui les oblige à se replonger dans le détail de leurs données RH pour en extraire les données spécifiques demandées par l'administration afin de pouvoir calculer l'index d'égalité H/F via une [plateforme dédiée](https://egapro.travail.gouv.fr/).

Ce projet a pour but de calculer l'index d'égalité pro d'une entreprise **automatiquement** à partir de la DSN.

### Solution

1. Extraction des données DSN nécessaires de l'entreprise
2. Envoi des paramètres au moteur de calcul [publicodes](https://publi.codes/)
3. Restitution et explication des résultats

### Impact envisagé

- réduire la charge des entreprises en les épargnant d'une démarche coûteuse et redondante (DLNUF)
- réduire la charge de l'administration quand à la gestion de la plateforme et des déclarations
- améliorer la qualité et couverture des index (on part des données réelles de la DSN)
- publier régulièrement les données sur data.gouv

### Ressources

- Un pad de travail pour [quelques notes](https://pad.numerique.gouv.fr/E6f6QzEYTySMdUVbZEa0Mw?both#Variables-Publicodes-)
- [Les requêtes de test](../drafts.md)

### Equipe

- Christiphe CUQ, URSSAF
- Jeremy, URSSAF
- Alain Foret, [ZenDSN](https://zendsn.com/)
- Alexandre, [ZenDSN](https://zendsn.com/)
- Arnaud Robin, beta.gouv.fr
- Julien Bouquillon, beta.gouv.fr

### [Facultatif] Retours sur la qualité des données exploitées

- Une interface dédiée à la doc/schemas de la base aurait été bienvenue
- Quelques IDs d'entreprises ou salaries de "reference" pourraient être utiles pour tester nos requêtes sur des cas "propres"; On ne sait pas si on tombe sur des cas "exotiques" ou "obsolètes" qui peuvent nous faire douter.
