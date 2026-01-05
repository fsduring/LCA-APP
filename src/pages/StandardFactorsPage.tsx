import { ChangeEvent, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { Factor } from '../data/factors';
import { useData } from '../data/DataProvider';
import { FactorImportPayload } from '../data/types';

const REQUIRED_COLUMNS = {
  name: ['navn', 'name', 'betegnelse', 'materiale', 'fraktion', 'produkt'],
  module: ['modul', 'module'],
  unit: ['enhed', 'unit'],
  factor: ['co2e', 'co2', 'faktor', 'emission'],
};

const OPTIONAL_COLUMNS = {
  source: ['kilde', 'source'],
  kgPerUnit: ['kgpr', 'kgper', 'kgperenhed', 'kgperunit', 'kgprenhed'],
};

type ParsedResult = {
  factors: Factor[];
  duplicatesRemoved: number;
  importedRows: number;
};

function normalizeHeader(value: unknown) {
  return String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '');
}

function findColumn(headers: string[], patterns: string[]) {
  return headers.findIndex((header) => patterns.some((pattern) => header.includes(pattern)));
}

function parseDanishNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const raw = String(value ?? '').trim();
  if (!raw) return null;
  const normalized = raw
    .replace(/\s+/g, '')
    .replace(/\.(?=\d{3}(\D|$))/g, '')
    .replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseWorkbook(workbook: XLSX.WorkBook): ParsedResult {
  const factorsByKey = new Map<string, Factor>();
  let duplicatesRemoved = 0;
  let importedRows = 0;
  let relevantSheetFound = false;

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) return;

    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: '' }) as Array<Array<unknown>>;
    const headerRow = rows.find((row) => row.some((cell) => String(cell ?? '').trim()));
    if (!headerRow) return;

    const normalizedHeaders = headerRow.map(normalizeHeader);
    const nameIndex = findColumn(normalizedHeaders, REQUIRED_COLUMNS.name);
    const moduleIndex = findColumn(normalizedHeaders, REQUIRED_COLUMNS.module);
    const unitIndex = findColumn(normalizedHeaders, REQUIRED_COLUMNS.unit);
    const factorIndex = findColumn(normalizedHeaders, REQUIRED_COLUMNS.factor);

    const hasAnyExpected = [nameIndex, moduleIndex, unitIndex, factorIndex].some((index) => index >= 0);
    if (!hasAnyExpected) return;

    if ([nameIndex, moduleIndex, unitIndex, factorIndex].some((index) => index < 0)) {
      throw new Error(`Ark "${sheetName}" mangler forventede kolonner (navn, modul, enhed, faktor).`);
    }

    relevantSheetFound = true;
    const sourceIndex = findColumn(normalizedHeaders, OPTIONAL_COLUMNS.source);
    const kgPerUnitIndex = findColumn(normalizedHeaders, OPTIONAL_COLUMNS.kgPerUnit);

    rows.slice(rows.indexOf(headerRow) + 1).forEach((row) => {
      const name = String(row[nameIndex] ?? '').trim();
      const module = String(row[moduleIndex] ?? '').trim();
      const unit = String(row[unitIndex] ?? '').trim();
      const factorValue = parseDanishNumber(row[factorIndex]);
      if (!name || !module || !unit || factorValue === null) return;

      const source = sourceIndex >= 0 ? String(row[sourceIndex] ?? '').trim() : '';
      const kgPerUnit = kgPerUnitIndex >= 0 ? parseDanishNumber(row[kgPerUnitIndex]) : null;

      const key = `${name}|${module}`;
      if (factorsByKey.has(key)) {
        duplicatesRemoved += 1;
      }
      factorsByKey.set(key, {
        key,
        name,
        module,
        unit,
        factorKgCO2ePerUnit: factorValue,
        source: source || sheetName,
        kgPerUnitForAffald: kgPerUnit === null ? undefined : kgPerUnit,
      });
      importedRows += 1;
    });
  });

  if (!relevantSheetFound) {
    throw new Error('Ingen ark med forventede kolonner blev fundet i filen.');
  }

  const factors = Array.from(factorsByKey.values());
  if (factors.length === 0) {
    throw new Error('Ingen gyldige faktorer blev importeret.');
  }

  return { factors, duplicatesRemoved, importedRows };
}

export default function StandardFactorsPage() {
  const { factors, factorMeta, resetFactors, setImportedFactors } = useData();
  const [error, setError] = useState('');
  const [summary, setSummary] = useState<ParsedResult | null>(null);

  const statusText = useMemo(() => {
    if (!factorMeta) return 'Ingen standard indlæst';
    const formattedDate = new Date(factorMeta.importedAt).toLocaleString('da-DK');
    return `Standard indlæst: ${factorMeta.filename} (${formattedDate})`;
  }, [factorMeta]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError('');
    setSummary(null);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const parsed = parseWorkbook(workbook);
      const payload: FactorImportPayload = {
        meta: {
          filename: file.name,
          importedAt: new Date().toISOString(),
        },
        factors: parsed.factors,
      };
      setImportedFactors(payload);
      setSummary(parsed);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ukendt fejl ved import af standardfaktorer.';
      setError(message);
    } finally {
      event.target.value = '';
    }
  };

  const handleReset = () => {
    resetFactors();
    setSummary(null);
    setError('');
  };

  const handleExport = () => {
    const payload = {
      meta: factorMeta ?? { filename: 'default', importedAt: new Date().toISOString() },
      factors,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `factors-${factorMeta?.filename ?? 'default'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <section className="card">
        <h2 className="section-title">Faktorer / Standard</h2>
        <p>{statusText}</p>
        <label>
          Upload Excel (.xlsx)
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
        </label>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
          <button type="button" className="primary" onClick={handleReset}>
            Nulstil til default factors.ts
          </button>
          <button type="button" className="primary" onClick={handleExport}>
            Eksportér factors som JSON
          </button>
        </div>
        {summary && (
          <p style={{ marginTop: '12px' }}>
            Importerede {summary.factors.length} faktorer (læste {summary.importedRows} rækker, fjernede{' '}
            {summary.duplicatesRemoved} dubletter).
          </p>
        )}
        {error && <p className="error-text" style={{ marginTop: '12px' }}>{error}</p>}
      </section>
    </div>
  );
}
