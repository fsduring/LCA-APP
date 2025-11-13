export type Faktor = {
  type: string;
  enhed: string;
  co2FaktorKgPerEnhed: number;
  kilde: string;
};

export type ElPost = {
  id: string;
  dato: string;
  type: string;
  enhed: string;
  maengde: number;
  kilde: string;
  kommentar?: string;
  co2FaktorKgPerEnhed: number;
  beregnetCo2Kg: number;
};

export type VandPost = {
  id: string;
  dato: string;
  type: string;
  enhed: string;
  maengde: number;
  kilde: string;
  kommentar?: string;
  co2FaktorKgPerEnhed: number;
  beregnetCo2Kg: number;
};

export type BraendstofPost = {
  id: string;
  dato: string;
  type: string;
  enhed: string;
  maengde: number;
  kilde: string;
  kommentar?: string;
  co2FaktorKgPerEnhed: number;
  beregnetCo2Kg: number;
};

export type MaterialePost = {
  id: string;
  dato: string;
  materiale: string;
  produktNote?: string;
  enhed: string;
  maengde: number;
  leverandoer?: string;
  transportmetodeAbc?: 'a' | 'b' | 'c';
  transportdistanceKm?: number;
  co2FaktorKgPerEnhed: number;
  beregnetCo2Kg: number;
};

export type AffaldPost = {
  id: string;
  dato: string;
  fraktion: string;
  enhed: string;
  maengde: number;
  modtager?: string;
  genanvendelseProcent?: number;
  kommentar?: string;
  co2FaktorKgPerEnhed: number;
  beregnetCo2Kg: number;
  erSpild: boolean;
};

export type BygningInfo = {
  projektNavn: string;
  bygningArealM2: number;
};

export type DataState = {
  faktorer: Faktor[];
  el: ElPost[];
  vand: VandPost[];
  braendstof: BraendstofPost[];
  materialer: MaterialePost[];
  affald: AffaldPost[];
  bygning: BygningInfo;
};
