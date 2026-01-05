import * as XLSX from 'xlsx';
import { Factor } from './factors';

type FactorField = 'name' | 'module' | 'unit' | 'factorKgCo2PerUnit' | 'key' | 'source';

const HEADER_ALIASES: Record<FactorField, string[]> = {
  name: ['navn', 'name', 'materiale', 'fraktion'],
  module: ['modul', 'module'],
  unit: ['enhed', 'unit'],
  factorKgCo2PerUnit: [
    'faktor_kgco2e_pr_enhed',
    'faktor',
    'co2',
    'kg co2e',
    'kgco2e',
    'kgco2e/enhed',
    'kg co2e/enhed',
    'kgco2e pr enhed',
    'kg co2e pr enhed',
    'faktorkgco2eprenenhed',
  ],
  key: ['key', 'nøgle', 'noegle', 'id'],
  source: ['kilde', 'source'],
};

const REQUIRED_FIELDS: FactorField[] = ['name', 'module', 'unit', 'factorKgCo2PerUnit'];

const normalizeHeader = (value: unknown) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[().]/g, '')
    .replace(/\s+/g, '')
    .replace(/[_/\\-]+/g, '');

function mapHeaders(headers: unknown[]) {
  const normalizedHeaders = headers.map((header) => normalizeHeader(header));
  const mapping: Partial<Record<FactorField, number>> = {};

  (Object.keys(HEADER_ALIASES) as FactorField[]).forEach((field) => {
    const aliases = new Set(HEADER_ALIASES[field].map((alias) => normalizeHeader(alias)));
    const index = normalizedHeaders.findIndex((header) => aliases.has(header));
    if (index >= 0) {
      mapping[field] = index;
    }
  });

  return mapping;
}

function normalizeString(value: unknown) {
  return String(value ?? '').trim();
}

function normalizeNumber(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  const normalized = String(value ?? '')
    .trim()
    .replace(/\s/g, '')
    .replace(',', '.');
  if (!normalized) return undefined;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function buildKey(name: string, module: string, rawKey?: string) {
  const trimmedKey = rawKey?.trim();
  if (trimmedKey) return trimmedKey;
  return `${name}|${module}`;
}

export function parseFactorsFromWorkbook(buffer: ArrayBuffer): Factor[] {
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error('Excel-arket indeholder ingen faner.');
  }

  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, defval: '' });
  const headerRowIndex = rows.findIndex((row) => row.some((cell) => String(cell ?? '').trim() !== ''));
  if (headerRowIndex === -1) {
    throw new Error('Excel-arket er tomt.');
  }

  const headers = rows[headerRowIndex];
  const headerMap = mapHeaders(headers);
  const missing = REQUIRED_FIELDS.filter((field) => headerMap[field] === undefined);
  if (missing.length > 0) {
    const names = missing.map((field) => HEADER_ALIASES[field][0]);
    throw new Error(`Manglende kolonner: ${names.join(', ')}`);
  }

  const factorsByKey = new Map<string, Factor>();

  rows.slice(headerRowIndex + 1).forEach((row, index) => {
    const hasValues = row.some((cell) => String(cell ?? '').trim() !== '');
    if (!hasValues) return;

    const getCell = (field: FactorField) => row[headerMap[field] ?? -1];
    const name = normalizeString(getCell('name'));
    const module = normalizeString(getCell('module'));
    const unit = normalizeString(getCell('unit'));
    const factorValue = normalizeNumber(getCell('factorKgCo2PerUnit'));
    const source = normalizeString(getCell('source')) || 'Excel upload';
    const key = buildKey(name, module, normalizeString(getCell('key')));

    const rowNumber = headerRowIndex + index + 2;
    if (!name || !module || !unit || factorValue === undefined) {
      throw new Error(`Række ${rowNumber} mangler kritiske felter (Navn, Modul, Enhed eller Faktor).`);
    }

    factorsByKey.set(key, {
      key,
      name,
      module,
      unit,
      factorKgCo2PerUnit: factorValue,
      source,
    });
  });

  if (factorsByKey.size === 0) {
    throw new Error('Excel-arket indeholder ingen gyldige faktorer.');
  }

  return Array.from(factorsByKey.values()).sort((a, b) => a.name.localeCompare(b.name));
}
