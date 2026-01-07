import { DEFAULT_FACTORS } from './factors';
import { DataState } from './types';

const today = new Date().toISOString().slice(0, 10);

function factorByKey(key: string) {
  const factor = DEFAULT_FACTORS.find((item) => item.key === key);
  if (!factor) {
    throw new Error(`Faktor med key '${key}' findes ikke i standardlisten.`);
  }
  return factor;
}

const elFactor = factorByKey('el_dk_elmix');
const vandFactor = factorByKey('vand_drikkevand');
const dieselFactor = factorByKey('diesel_b7');
const betonFactor = factorByKey('Fabriksbeton (C25/30) i eksponeringsklasserne X0 og XC1|A1–A3');
const gipsFactor = factorByKey('Gipsplade, standard|A1–A3');
const teglFactor = factorByKey('teglsten_affald');
const affaldGipsFactor = factorByKey('affald_gips_haandtering');

export const initialData: DataState = {
  el: [
    {
      id: 'el-1',
      dato: today,
      factorKey: elFactor.key,
      factorName: elFactor.name,
      enhed: elFactor.unit,
      maengde: 1200,
      kilde: 'Hovedmåler tavle 1',
      kommentar: 'Uge 15 forbrug',
      co2FaktorKgPerEnhed: elFactor.factorKgCo2PerUnit,
      beregnetCo2Kg: Number((1200 * elFactor.factorKgCo2PerUnit).toFixed(3)),
    },
  ],
  vand: [
    {
      id: 'vand-1',
      dato: today,
      factorKey: vandFactor.key,
      factorName: vandFactor.name,
      enhed: vandFactor.unit,
      maengde: 15,
      kilde: 'Vandmåler',
      kommentar: 'Midlertidigt byggeri',
      co2FaktorKgPerEnhed: vandFactor.factorKgCo2PerUnit,
      beregnetCo2Kg: Number((15 * vandFactor.factorKgCo2PerUnit).toFixed(3)),
    },
  ],
  braendstof: [
    {
      id: 'braendstof-1',
      dato: today,
      factorKey: dieselFactor.key,
      factorName: dieselFactor.name,
      enhed: dieselFactor.unit,
      maengde: 350,
      kilde: 'Leverandør X',
      kommentar: 'Gravemaskine',
      co2FaktorKgPerEnhed: dieselFactor.factorKgCo2PerUnit,
      beregnetCo2Kg: Number((350 * dieselFactor.factorKgCo2PerUnit).toFixed(3)),
    },
  ],
  materialer: [
    {
      id: 'materiale-1',
      dato: today,
      factorKey: betonFactor.key,
      materiale: betonFactor.name,
      produktNote: 'Fundament blok A',
      enhed: betonFactor.unit,
      maengde: 2500,
      leverandoer: 'Beton A/S',
      transportmetodeAbc: 'a',
      transportdistanceKm: 35,
      co2FaktorKgPerEnhed: betonFactor.factorKgCo2PerUnit,
      beregnetCo2Kg: Number((2500 * betonFactor.factorKgCo2PerUnit).toFixed(3)),
    },
    {
      id: 'materiale-2',
      dato: today,
      factorKey: gipsFactor.key,
      materiale: gipsFactor.name,
      produktNote: 'Indervægge plan 2',
      enhed: gipsFactor.unit,
      maengde: 850,
      leverandoer: 'Gips DK',
      transportmetodeAbc: 'b',
      transportdistanceKm: 20,
      co2FaktorKgPerEnhed: gipsFactor.factorKgCo2PerUnit,
      beregnetCo2Kg: Number((850 * gipsFactor.factorKgCo2PerUnit).toFixed(3)),
    },
  ],
  affald: [
    {
      id: 'affald-1',
      dato: today,
      factorKey: teglFactor.key,
      fraktion: teglFactor.name,
      enhed: teglFactor.unit,
      maengde: 420,
      modtager: 'Affald & Co.',
      genanvendelseProcent: 70,
      kommentar: 'Rester fra facaderenovering',
      co2FaktorKgPerEnhed: teglFactor.factorKgCo2PerUnit,
      beregnetCo2Kg: Number((420 * teglFactor.factorKgCo2PerUnit).toFixed(3)),
      erSpild: false,
    },
    {
      id: 'affald-2',
      dato: today,
      factorKey: affaldGipsFactor.key,
      fraktion: affaldGipsFactor.name,
      enhed: affaldGipsFactor.unit,
      maengde: 160,
      modtager: 'MiljøHåndtering ApS',
      genanvendelseProcent: 40,
      kommentar: 'Spild fra montage',
      co2FaktorKgPerEnhed: affaldGipsFactor.factorKgCo2PerUnit,
      beregnetCo2Kg: Number((160 * affaldGipsFactor.factorKgCo2PerUnit).toFixed(3)),
      erSpild: true,
    },
  ],
  bygning: {
    projektNavn: 'BBBO Blok I',
    bygningArealM2: 7850,
  },
};
