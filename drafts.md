# Mappings

## S21.G00.40.002

DSN | Desc | EgaPro
----|------|------
01  | agriculteur salarié de son exploitation | ouvriers
02  | artisan ou commerçant salarié de son entreprise | ouvriers
03  | cadre dirigeant (votant au collège employeur des élections prud'homales) | ingénieurs et cadres
04  |  autres cadres au sens de la convention collective (ou du statut pour les régimes spéciaux) | ingénieurs et cadres
05  |  profession intermédiaire (technicien, contremaître, agent de maîtrise, clergé) | techniciens et agents de maitrise
06  | employé administratif d'entreprise, de commerce, agent de service | employés
07  | ouvriers qualifiés et non qualifiés y compris ouvriers agricoles | ouvriers
08  | agent de la fonction publique d'Etat | X
09  | agent de la fonction publique hospitalière | X
10  | agent de la fonction publique territoriale | X

## Requêtes SQL

```sql

--- liste des contrats d'un assuré
select
  *
from
  ddadtcontrat
  left join ddadtemployeur_assure on ddadtemployeur_assure.id = ddadtcontrat.id_employeur_assure
where
  ddadtemployeur_assure.id_employeur = 1069987
  and ddadtemployeur_assure.id_assure = 582623;

--- liste des versements d'un assuré pour un employeur
select
  *
from
  ddadtsalaire_base
  left join ddadtversement on ddadtversement.id = ddadtsalaire_base.id_versement
  left join ddadtemployeur_assure on ddadtemployeur_assure.id = ddadtversement.id_employeur_assure
where
  ddadtemployeur_assure.id_employeur = 1069987
  and ddadtemployeur_assure.id_assure = 582623;


--- liste des versements par mois, an, contrat, assuré d'une entreprise
select
  EXTRACT(
    MONTH
    FROM
      ddadtsalaire_base.date_debut_paie
  ) as MONTH,
  EXTRACT(
    YEAR
    FROM
      ddadtsalaire_base.date_debut_paie
  ) as YEAR,
  ddadtcontrat.num_contrat,
  ddadtassure.sexe,
  EXTRACT(
    YEAR
    FROM
      age(
        NOW(),
        TO_DATE(
          ddadtassure.date_naissance, 'DDMMYYYY'
        )
      )
  ),
  ddadtcontrat.unite_mesure,
  ddadtcontrat.quotite,
  ddadtcontrat.quotite_categorie,
  ddadtcontrat.pcs_ese,
  ddadtcontrat.statut_conventionnel,
  -- CSP
  ddadtcontrat.nature_contrat,
  -- S21.G00.40.007
  ddadtsalaire_base.montant as SALAIRE_BRUT
from
  ddadtsalaire_base
  left join ddadtversement on ddadtversement.id = ddadtsalaire_base.id_versement
  left join ddadtemployeur_assure on ddadtemployeur_assure.id = ddadtversement.id_employeur_assure
  left join ddadtassure on ddadtassure.id = ddadtemployeur_assure.id_assure
  left join ddadtcontrat on ddadtcontrat.id_employeur_assure = ddadtemployeur_assure.id
  and ddadtsalaire_base.numero_contrat = ddadtcontrat.num_contrat
where
  ddadtemployeur_assure.id_employeur = 1069987
```
