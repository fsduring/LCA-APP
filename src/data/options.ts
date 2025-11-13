import { FACTORS } from './factors';

const FACTOR_NAME_BY_KEY = new Map(FACTORS.map((factor) => [factor.key, factor.name]));

function requireFactorName(key: string) {
  const name = FACTOR_NAME_BY_KEY.get(key);
  if (!name) {
    throw new Error(`Factor key '${key}' not found in FACTORS.`);
  }
  return name;
}

export const EL_TYPES = ['el-dk-elmix-a5', 'fjernvarme-a5'].map(requireFactorName);
export const VAND_TYPES = ['vand-drikkevand-a5'].map(requireFactorName);
export const BRAENDSTOF_TYPES = ['diesel-b7-a5', 'benzin-a5'].map(requireFactorName);
export const MATERIALE_TYPES = [
  'fabriksbeton-c25-30-i-eksponeringsklasserne-x0-og-xc1-a1-3',
  'gipsplade-standard-a1-3',
].map(requireFactorName);
export const AFFALD_TYPES = ['affald-tegl-a5', 'affald-gips-a5'].map(requireFactorName);
