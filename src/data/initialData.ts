import { FACTORS } from './factors';
import { DataState } from './types';

const FACTOR_BY_NAME = new Map(FACTORS.map((factor) => [factor.name, factor]));

function requireFactor(name: string) {
  const factor = FACTOR_BY_NAME.get(name);
  if (!factor) {
    throw new Error(`Factor '${name}' not found in FACTORS.`);
  }
  return factor;
}

function calculateCo2(amount: number, factorValue: number) {
  return Number((amount * factorValue).toFixed(3));
}

const elFactor = requireFactor('El (DK elmix)');
const vandFactor = requireFactor('Vand (drikkevand)');
const dieselFactor = requireFactor('Diesel (B7)');
const betonFactor = requireFactor('Fabriksbeton (C25/30) i eksponeringsklasserne X0 og XC1');
const gipsFactor = requireFactor('Gipsplade, standard');
const affaldTeglFactor = requireFactor('Affald – tegl');
const affaldGipsFactor = requireFactor('Affald – gips');

export const initialData: DataState = {
  faktorer: FACTORS,
  el: [
    {
      id: 'el-1',
      dato: new Date().toISOString().slice(0, 10),
      type: elFactor.name,
      enhed: elFactor.unit,
      maengde: 1200,
      kilde: 'Hovedmåler tavle 1',
      kommentar: 'Uge 15 forbrug',
      co2FaktorKgPerEnhed: elFactor.factorKgCo2PerUnit,
      beregnetCo2Kg: calculateCo2(1200, elFactor.factorKgCo2PerUnit),
    },
  ],
  vand: [
    {
      id: 'vand-1',
      dato: new Date().toISOString().slice(0, 10),
      type: vandFactor.name,
      enhed: vandFactor.unit,
      maengde: 15,
      kilde: 'Vandmåler',
      kommentar: 'Midlertidigt byggeri',
      co2FaktorKgPerEnhed: vandFactor.factorKgCo2PerUnit,
      beregnetCo2Kg: calculateCo2(15, vandFactor.factorKgCo2PerUnit),
    },
  ],
  braendstof: [
    {
      id: 'braendstof-1',
      dato: new Date().toISOString().slice(0, 10),
      type: dieselFactor.name,
      enhed: dieselFactor.unit,
      maengde: 350,
      kilde: 'Leverandør X',
      kommentar: 'Gravemaskine',
      co2FaktorKgPerEnhed: dieselFactor.factorKgCo2PerUnit,
      beregnetCo2Kg: calculateCo2(350, dieselFactor.factorKgCo2PerUnit),
    },
  ],
  materialer: [
    {
      id: 'materiale-1',
      dato: new Date().toISOString().slice(0, 10),
      materiale: betonFactor.name,
      produktNote: 'Fundament blok A',
      enhed: betonFactor.unit,
      maengde: 10,
      leverandoer: 'Beton A/S',
      transportmetodeAbc: 'a',
      transportdistanceKm: 35,
      co2FaktorKgPerEnhed: betonFactor.factorKgCo2PerUnit,
      beregnetCo2Kg: calculateCo2(10, betonFactor.factorKgCo2PerUnit),
    },
    {
      id: 'materiale-2',
      dato: new Date().toISOString().slice(0, 10),
      materiale: gipsFactor.name,
      produktNote: 'Indervægge plan 2',
      enhed: gipsFactor.unit,
      maengde: 120,
      leverandoer: 'Gips DK',
      transportmetodeAbc: 'b',
      transportdistanceKm: 20,
      co2FaktorKgPerEnhed: gipsFactor.factorKgCo2PerUnit,
      beregnetCo2Kg: calculateCo2(120, gipsFactor.factorKgCo2PerUnit),
    },
  ],
  affald: [
    {
      id: 'affald-1',
      dato: new Date().toISOString().slice(0, 10),
      fraktion: affaldTeglFactor.name,
      enhed: affaldTeglFactor.unit,
      maengde: 420,
      modtager: 'Affald & Co.',
      genanvendelseProcent: 70,
      kommentar: 'Rester fra facaderenovering',
      co2FaktorKgPerEnhed: affaldTeglFactor.factorKgCo2PerUnit,
      beregnetCo2Kg: calculateCo2(420, affaldTeglFactor.factorKgCo2PerUnit),
      erSpild: false,
    },
    {
      id: 'affald-2',
      dato: new Date().toISOString().slice(0, 10),
      fraktion: affaldGipsFactor.name,
      enhed: affaldGipsFactor.unit,
      maengde: 160,
      modtager: 'MiljøHåndtering ApS',
      genanvendelseProcent: 40,
      kommentar: 'Spild fra montage',
      co2FaktorKgPerEnhed: affaldGipsFactor.factorKgCo2PerUnit,
      beregnetCo2Kg: calculateCo2(160, affaldGipsFactor.factorKgCo2PerUnit),
      erSpild: true,
    },
  ],
  bygning: {
    projektNavn: 'BBBO Blok I',
    bygningArealM2: 7850,
  },
};
