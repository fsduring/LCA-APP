import { FAKTORER, type Faktor } from './factors';

const sortByType = (list: Faktor[]) =>
  [...list].sort((a, b) => a.type.localeCompare(b.type, 'da')); // Danish locale for readability

export const EL_FAKTORER = sortByType(
  FAKTORER.filter((faktor) => faktor.modul === 'A5' && faktor.enhed === 'kWh')
);

export const VAND_FAKTORER = sortByType(
  FAKTORER.filter(
    (faktor) => faktor.modul === 'A5' && faktor.type.toLowerCase().includes('vand')
  )
);

export const BRAENDSTOF_FAKTORER = sortByType(
  FAKTORER.filter(
    (faktor) =>
      faktor.modul === 'A5' &&
      (faktor.type.toLowerCase().includes('diesel') || faktor.type.toLowerCase().includes('benzin'))
  )
);

export const MATERIALE_FAKTORER = sortByType(
  FAKTORER.filter((faktor) => faktor.modul.includes('A1'))
);

export const AFFALD_FAKTORER = sortByType(
  FAKTORER.filter((faktor) => faktor.modul === 'A5' && faktor.type.toLowerCase().includes('affald'))
);
