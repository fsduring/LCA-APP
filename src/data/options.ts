import { Factor } from './factors';
import { Category } from './types';

const KEYWORD_FILTERS: Record<Category, RegExp[]> = {
  el: [/(^|\s)el/i, /elmix/i],
  vand: [/vand/i, /water/i],
  braendstof: [/diesel/i, /benzin/i, /fuel/i, /brændstof/i, /biodiesel/i, /petro/i],
  materialer: [/./],
  affald: [/affald/i, /spild/i, /waste/i],
};

const EXCLUDE_FOR_MATERIALER = [/affald/i, /diesel/i, /benzin/i, /brændstof/i, /vand/i, /el/i];

export function getFactorsForCategory(factors: Factor[], category: Category): Factor[] {
  if (category === 'materialer') {
    return factors
      .filter((factor) =>
        (!factor.module || /A1/i.test(factor.module) || /A2/i.test(factor.module) || /A3/i.test(factor.module)) &&
        !EXCLUDE_FOR_MATERIALER.some((regex) => regex.test(factor.name))
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  const matchers = KEYWORD_FILTERS[category];
  return factors
    .filter((factor) => matchers.some((regex) => regex.test(factor.name) || regex.test(factor.key)))
    .sort((a, b) => a.name.localeCompare(b.name));
}
