import { Factor } from './factors';

export type ElPost = {
  id: string;
  dato: string;
  factorKey: string;
  factorName: string;
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
  factorKey: string;
  factorName: string;
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
  factorKey: string;
  factorName: string;
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
  factorKey: string;
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
  factorKey: string;
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
  el: ElPost[];
  vand: VandPost[];
  braendstof: BraendstofPost[];
  materialer: MaterialePost[];
  affald: AffaldPost[];
  bygning: BygningInfo;
};

export type Category = 'el' | 'vand' | 'braendstof' | 'materialer' | 'affald';

export type DataContextValue = DataState & {
  factors: Factor[];
  addEl: (input: AddEl) => void;
  addVand: (input: AddVand) => void;
  addBraendstof: (input: AddBraendstof) => void;
  addMateriale: (input: AddMateriale) => void;
  addAffald: (input: AddAffald) => void;
  deleteRecord: (category: Category, id: string) => void;
  updateBygning: (info: BygningInfo) => void;
  getFactorByKey: (key: string) => Factor | undefined;
  importFromExcel: (file: File) => Promise<void>;
};

export type AddEl = {
  dato: string;
  factorKey: string;
  maengde: number;
  kilde: string;
  kommentar?: string;
};

export type AddVand = {
  dato: string;
  factorKey: string;
  maengde: number;
  kilde: string;
  kommentar?: string;
};

export type AddBraendstof = {
  dato: string;
  factorKey: string;
  maengde: number;
  kilde: string;
  kommentar?: string;
};

export type AddMateriale = {
  dato: string;
  factorKey: string;
  maengde: number;
  produktNote?: string;
  leverandoer?: string;
  transportmetodeAbc?: 'a' | 'b' | 'c';
  transportdistanceKm?: number;
};

export type AddAffald = {
  dato: string;
  factorKey: string;
  maengde: number;
  modtager?: string;
  genanvendelseProcent?: number;
  kommentar?: string;
  erSpild: boolean;
};
