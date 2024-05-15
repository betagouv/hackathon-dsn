export interface PublicodesResult {
  note: string;
  rémunérations: Rémunérations;
  augmentations: Tions;
  promotions: Tions;
  maternité: Maternité;
  "hautes rémunérations": HautesRémunérations;
}

export interface Tions {
  "effectifs valides": string;
  "écart pondéré": string;
  calculable: string;
  "indicateur d'écart d'augmentations"?: string;
  note: string;
  "indicateur d'écart de promotions"?: string;
}

export interface HautesRémunérations {
  calculable: string;
  note: string;
}

export interface Maternité {
  calculable: string;
  "indicateur de maternité": string;
  note: string;
}

export interface Rémunérations {
  effectifs: string;
  "effectifs valides": string;
  "écart pondéré": string;
  calculable: string;
  "indicateur d'écart de rémunération": string;
  note: string;
}
