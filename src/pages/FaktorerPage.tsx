import { ChangeEvent, useState } from 'react';
import * as XLSX from 'xlsx';
import { useData } from '../data/DataProvider';
import { A1A3_MODULE, Factor, isA1A3Module } from '../data/factors';

function normalizeHeader(value: unknown): string {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[_]/g, ' ')
    .replace(/[()]/g, '')
    .replace(/,/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value !== 'string') {
    return null;
  }
  const raw = value.trim();
  if (!raw) return null;
  let normalized = raw.replace(/\s/g, '');
  if (normalized.includes(',') && normalized.includes('.')) {
    normalized = normalized.replace(/\./g, '').replace(',', '.');
  } else if (normalized.includes(',')) {
    normalized = normalized.replace(',', '.');
  }
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function findHeaderIndex(headers: string[], matcher: (header: string) => boolean): number {
  return headers.findIndex((header) => matcher(header));
}

function detectFormat(headers: string[]) {
  const navnIndex = findHeaderIndex(headers, (header) => header.includes('navn dk'));
  const faktorIndex = findHeaderIndex(
    headers,
    (header) => header.includes('global opvarmning') && header.includes('a1-a3')
  );
  const enhedIndex = findHeaderIndex(headers, (header) => header.includes('deklareret enhed') && header.includes('fu'));
  const hasFormatB = navnIndex >= 0 && faktorIndex >= 0 && enhedIndex >= 0;

  const navnAIndex = findHeaderIndex(headers, (header) => header === 'navn' || header.endsWith(' navn') || header.startsWith('navn '));
  const modulIndex = findHeaderIndex(headers, (header) => header === 'modul' || header.includes('modul'));
  const enhedAIndex = findHeaderIndex(headers, (header) => header === 'enhed' || header.includes('enhed'));
  const faktorAIndex = findHeaderIndex(headers, (header) => header.includes('faktor') && header.includes('kg') && header.includes('co2'));
  const keyIndex = findHeaderIndex(headers, (header) => header === 'key' || header.includes('key'));
  const hasFormatA = navnAIndex >= 0 && modulIndex >= 0 && enhedAIndex >= 0 && faktorAIndex >= 0 && keyIndex >= 0;

  if (hasFormatB) {
    return {
      format: 'B' as const,
      indices: { navnIndex, faktorIndex, enhedIndex },
    };
  }

  if (hasFormatA) {
    return {
      format: 'A' as const,
      indices: { navnIndex: navnAIndex, modulIndex, enhedIndex: enhedAIndex, faktorIndex: faktorAIndex, keyIndex },
    };
  }

  return null;
}

function buildFactorsFromRows(rows: unknown[][]): { factors: Factor[]; format: 'A' | 'B' } {
  if (rows.length === 0) {
    return { factors: [], format: 'A' };
  }

  const headers = rows[0].map((cell) => normalizeHeader(cell));
  const formatInfo = detectFormat(headers);
  if (!formatInfo) {
    return { factors: [], format: 'A' };
  }

  const factorsMap = new Map<string, Factor>();

  if (formatInfo.format === 'B') {
    const { navnIndex, faktorIndex, enhedIndex } = formatInfo.indices;
    rows.slice(1).forEach((row) => {
      const name = String(row[navnIndex] ?? '').trim();
      const unit = String(row[enhedIndex] ?? '').trim();
      const factorValue = parseNumber(row[faktorIndex]);
      if (!name || !unit || factorValue === null) {
        return;
      }
      const key = `${name}|${A1A3_MODULE}`;
      factorsMap.set(key, {
        key,
        name,
        module: A1A3_MODULE,
        unit,
        factorKgCo2PerUnit: factorValue,
        source: 'BR2025 Tabel 7',
      });
    });

    return { factors: Array.from(factorsMap.values()), format: 'B' };
  }

  const { navnIndex, modulIndex, enhedIndex, faktorIndex, keyIndex } = formatInfo.indices;
  rows.slice(1).forEach((row) => {
    const name = String(row[navnIndex] ?? '').trim();
    const module = String(row[modulIndex] ?? '').trim();
    const unit = String(row[enhedIndex] ?? '').trim();
    const factorValue = parseNumber(row[faktorIndex]);
    const key = String(row[keyIndex] ?? '').trim();
    if (!name || !module || !unit || !key || factorValue === null) {
      return;
    }
    factorsMap.set(key, {
      key,
      name,
      module,
      unit,
      factorKgCo2PerUnit: factorValue,
      source: 'Upload',
    });
  });

  return { factors: Array.from(factorsMap.values()), format: 'A' };
}

export default function FaktorerPage() {
  const { factors, updateFactors, resetFactors } = useData();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');
    setMessage('');

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      if (!worksheet) {
        setError('Kunne ikke finde et ark i Excel-filen.');
        return;
      }
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' }) as unknown[][];
      const { factors: imported } = buildFactorsFromRows(rows);
      const a1a3Imports = imported.filter((item) => isA1A3Module(item.module));
      if (a1a3Imports.length === 0) {
        setError(
          'Ingen gyldige rækker blev importeret. Tjek at Excel-filen har de forventede kolonner og data.'
        );
        return;
      }

      const nextFactors = [...factors.filter((item) => !isA1A3Module(item.module)), ...a1a3Imports];

      updateFactors(nextFactors);
      setMessage(`Importerede ${a1a3Imports.length} emissionsfaktorer.`);
    } catch (err) {
      console.error(err);
      setError('Der opstod en fejl under import. Prøv igen med en gyldig Excel-fil.');
    } finally {
      event.target.value = '';
    }
  };

  const handleReset = () => {
    if (!window.confirm('Vil du nulstille faktorer til standard?')) return;
    resetFactors();
    setMessage('Faktorerne er nulstillet.');
    setError('');
  };

  return (
    <div>
      <section className="card">
        <h2 className="section-title">Upload emissionsfaktorer</h2>
        <p style={{ marginBottom: '12px', fontSize: '0.9rem', color: '#475569' }}>
          Upload enten dit eget format (Navn, Modul, Enhed, Faktor_kgCO2e_pr_enhed, Key) eller BR2025 Tabel 7
          (Navn DK, Global Opvarmning, modul A1-A3, Deklareret enhed (FU)).
        </p>
        <div className="form-grid">
          <label className="full">
            Excel-fil
            <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
          </label>
        </div>
        {error && <p className="error-text">{error}</p>}
        {message && <p style={{ color: '#059669', fontSize: '0.9rem' }}>{message}</p>}
        <button type="button" className="danger" onClick={handleReset}>
          Nulstil faktorer
        </button>
      </section>
    </div>
  );
}
