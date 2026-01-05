import { Factor } from './factors';
import { Category } from './types';

const KEYWORD_FILTERS: Record<Category, RegExp[]> = {
  el: [/(^|\s)el/i, /elmix/i, /electric/i],
  vand: [/vand/i, /water/i],
  braendstof: [/diesel/i, /benzin/i, /fuel/i, /brændstof/i, /biodiesel/i, /petro/i],
  materialer: [],
  affald: [/affald/i, /waste/i, /spild/i, /genanvend/i],
};

const MATERIAL_MODULES = ['A1', 'A2', 'A3'];
const OTHER_MODULES = ['A4', 'A5'];

function extractModuleTokens(moduleValue: string | undefined) {
  if (!moduleValue) return [];
  return moduleValue
    .replace(/[–—]/g, '-')
    .toUpperCase()
    .split(/[^A-Z0-9]+/)
    .filter(Boolean);
}

function moduleHasAny(moduleValue: string | undefined, tokens: string[]) {
  const moduleTokens = extractModuleTokens(moduleValue);
  return tokens.some((token) => moduleTokens.includes(token.toUpperCase()));
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
  const moduleCandidate = (factor: Factor) => factor.module || factor.key;

  if (category === 'materialer') {
    return factors
      .filter((factor) => moduleHasAny(moduleCandidate(factor), MATERIAL_MODULES) && matchesSearch(factor, searchTerm))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  const matchers = KEYWORD_FILTERS[category];
  return factors
    .filter((factor) => moduleHasAny(moduleCandidate(factor), OTHER_MODULES))
    .filter((factor) => matchers.some((regex) => regex.test(factor.name) || regex.test(factor.key)))
    .filter((factor) => matchesSearch(factor, searchTerm))
    .sort((a, b) => a.name.localeCompare(b.name));
}
