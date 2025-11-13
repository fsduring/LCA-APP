export type Factor = {
  key: string;
  name: string;
  module: string;
  unit: string;
  factorKgCo2PerUnit: number;
  source: string;
};

export const FACTORS: Factor[] = [
  {
    key: 'el_dk_elmix',
    name: 'El (DK elmix)',
    module: 'A5',
    unit: 'kWh',
    factorKgCo2PerUnit: 0.233,
    source: 'Placeholder',
  },
  {
    key: 'vand_drikkevand',
    name: 'Vand (drikkevand)',
    module: 'A5',
    unit: 'm3',
    factorKgCo2PerUnit: 0.344,
    source: 'Placeholder',
  },
  {
    key: 'diesel_b7',
    name: 'Diesel (B7)',
    module: 'A4',
    unit: 'L',
    factorKgCo2PerUnit: 2.67,
    source: 'Placeholder',
  },
  {
    key: 'beton_c25_30',
    name: 'Beton C25/30',
    module: 'A1-A3',
    unit: 'kg',
    factorKgCo2PerUnit: 0.12,
    source: 'EPD DK',
  },
  {
    key: 'gipsplade_13mm',
    name: 'Gipsplade 13 mm',
    module: 'A1-A3',
    unit: 'kg',
    factorKgCo2PerUnit: 0.35,
    source: 'LCAbyg generisk',
  },
  {
    key: 'teglsten_affald',
    name: 'Teglsten',
    module: 'A5',
    unit: 'kg',
    factorKgCo2PerUnit: 0.22,
    source: 'Placeholder',
  },
  {
    key: 'affald_gips_haandtering',
    name: 'Affald - gips (håndtering)',
    module: 'A5',
    unit: 'kg',
    factorKgCo2PerUnit: 0.08,
    source: 'Placeholder',
  },
];
