import { Factor } from './factors';
import { Category } from './types';

function matchesSearch(factor: Factor, searchTerm: string) {
  if (!searchTerm) return true;
  const lower = searchTerm.toLowerCase();
  return factor.name.toLowerCase().includes(lower);
}

export function getFactorsForCategory(
  factors: Factor[],
  category: Category,
  searchTerm = ''
): Factor[] {
  return factors
    .filter((factor) => factor.category === category)
    .filter((factor) => matchesSearch(factor, searchTerm))
    .sort((a, b) => a.name.localeCompare(b.name));
}
