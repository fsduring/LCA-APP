import { Factor } from './factors';
import { Category } from './types';

const KEYWORD_FILTERS: Record<Category, RegExp[]> = {
  el: [/(^|\s)el/i, /elmix/i],
  vand: [/vand/i, /water/i],
  braendstof: [/diesel/i, /benzin/i, /fuel/i, /brændstof/i, /biodiesel/i, /petro/i],
  materialer: [/./],
  affald: [/affald/i, /spild/i, /waste/i],
};

const AFFALD_KEYWORDS = [/affald/i, /waste/i, /spild/i, /genanvend/i];

function moduleContains(moduleValue: string | undefined, token: string) {
  if (!moduleValue) return false;
  const normalized = moduleValue.replace(/[–—]/g, '-').toUpperCase();
  return normalized.includes(token.toUpperCase());
}

function matchesSearch(factor: Factor, searchTerm: string) {
  if (!searchTerm) return true;
  const lower = searchTerm.toLowerCase();
  return factor.name.toLowerCase().includes(lower) || factor.key.toLowerCase().includes(lower);
}

export function getFactorsForCategory(
  factors: Factor[],
  category: Category,
  searchTerm = ''
): Factor[] {
  if (category === 'materialer') {
    return factors
      .filter((factor) => moduleContains(factor.module, 'A1') && matchesSearch(factor, searchTerm))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  if (category === 'affald') {
    return factors
      .filter(
        (factor) =>
          (moduleContains(factor.module, 'A5') || AFFALD_KEYWORDS.some((regex) => regex.test(factor.name))) &&
          matchesSearch(factor, searchTerm)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  const matchers = KEYWORD_FILTERS[category];
  return factors
    .filter((factor) => matchers.some((regex) => regex.test(factor.name) || regex.test(factor.key)))
    .filter((factor) => matchesSearch(factor, searchTerm))
    .sort((a, b) => a.name.localeCompare(b.name));
}
