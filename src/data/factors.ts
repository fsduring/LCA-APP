export interface Faktor {
  type: string;
  modul: string;
  enhed: string;
  faktorKgCo2PerEnhed: number;
  kilde: string;
  key?: string;
  kgPrEnhedForAffald?: number;
}

const toNumber = (value: number) => Number(value.toFixed(6));

export const FAKTORER: Faktor[] = [
  {
    type: 'El (DK elmix)',
    modul: 'A5',
    enhed: 'kWh',
    faktorKgCo2PerEnhed: toNumber(0.233),
    kilde: 'Energinet 2023',
    key: 'energy-electricity-dk-mix',
  },
  {
    type: 'El (grøn certifikat)',
    modul: 'A5',
    enhed: 'kWh',
    faktorKgCo2PerEnhed: toNumber(0.025),
    kilde: 'Certificeret vedvarende el',
    key: 'energy-electricity-green',
  },
  {
    type: 'Vand (drikkevand)',
    modul: 'A5',
    enhed: 'm3',
    faktorKgCo2PerEnhed: toNumber(0.344),
    kilde: 'LCAbyg generisk',
    key: 'utility-water-drinking',
  },
  {
    type: 'Vand (grundvandssænkning)',
    modul: 'A5',
    enhed: 'm3',
    faktorKgCo2PerEnhed: toNumber(0.190),
    kilde: 'LCAbyg generisk',
    key: 'utility-water-dewatering',
  },
  {
    type: 'Diesel (B7)',
    modul: 'A5',
    enhed: 'L',
    faktorKgCo2PerEnhed: toNumber(2.67),
    kilde: 'Miljøstyrelsen 2022',
    key: 'fuel-diesel-b7',
  },
  {
    type: 'Benzin (E10)',
    modul: 'A5',
    enhed: 'L',
    faktorKgCo2PerEnhed: toNumber(2.31),
    kilde: 'Miljøstyrelsen 2022',
    key: 'fuel-gasoline-e10',
  },
  {
    type: 'HVO Diesel (100 %)',
    modul: 'A5',
    enhed: 'L',
    faktorKgCo2PerEnhed: toNumber(0.50),
    kilde: 'Leverandør EPD',
    key: 'fuel-hvo-diesel',
  },
  {
    type: 'Beton C25/30',
    modul: 'A1–A3',
    enhed: 'kg',
    faktorKgCo2PerEnhed: toNumber(0.12),
    kilde: 'EPD Danmark',
    key: 'material-concrete-c25-30',
  },
  {
    type: 'Gipsplade 13 mm',
    modul: 'A1–A3',
    enhed: 'kg',
    faktorKgCo2PerEnhed: toNumber(0.35),
    kilde: 'LCAbyg generisk',
    key: 'material-gypsum-13mm',
  },
  {
    type: 'Teglsten',
    modul: 'A1–A3',
    enhed: 'kg',
    faktorKgCo2PerEnhed: toNumber(0.22),
    kilde: 'LCAbyg generisk',
    key: 'material-brick',
  },
  {
    type: 'Armeringsstål B500B',
    modul: 'A1–A3',
    enhed: 'kg',
    faktorKgCo2PerEnhed: toNumber(1.70),
    kilde: 'EPD Danmark',
    key: 'material-rebar-b500b',
  },
  {
    type: 'Konstruktionstræ (C24)',
    modul: 'A1–A3',
    enhed: 'kg',
    faktorKgCo2PerEnhed: toNumber(0.05),
    kilde: 'LCAbyg generisk',
    key: 'material-structural-timber',
  },
  {
    type: 'Mineraluld isolering',
    modul: 'A1–A3',
    enhed: 'kg',
    faktorKgCo2PerEnhed: toNumber(1.20),
    kilde: 'LCAbyg generisk',
    key: 'material-mineral-wool',
  },
  {
    type: 'Affald - gips (håndtering)',
    modul: 'A5',
    enhed: 'kg',
    faktorKgCo2PerEnhed: toNumber(0.08),
    kilde: 'Affaldsdata 2022',
    key: 'waste-gypsum',
    kgPrEnhedForAffald: toNumber(1),
  },
  {
    type: 'Affald - tegl (håndtering)',
    modul: 'A5',
    enhed: 'kg',
    faktorKgCo2PerEnhed: toNumber(0.06),
    kilde: 'Affaldsdata 2022',
    key: 'waste-brick',
    kgPrEnhedForAffald: toNumber(1),
  },
  {
    type: 'Affald - beton (håndtering)',
    modul: 'A5',
    enhed: 'kg',
    faktorKgCo2PerEnhed: toNumber(0.05),
    kilde: 'Affaldsdata 2022',
    key: 'waste-concrete',
    kgPrEnhedForAffald: toNumber(1),
  },
];
