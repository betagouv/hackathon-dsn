# Des requêtes SQL

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
