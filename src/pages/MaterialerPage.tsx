import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import * as XLSX from '@e965/xlsx';
import { useData } from '../data/DataProvider';
import { Factor } from '../data/factors';
import { getFactorsForCategory } from '../data/options';

const today = new Date().toISOString().slice(0, 10);

type MaterialeFormState = {
  dato: string;
  factorKey: string;
  maengde: string;
  produktNote: string;
  leverandoer: string;
  transportmetodeAbc: '' | 'a' | 'b' | 'c';
  transportdistanceKm: string;
};

type ParsedFactorRow = {
  key: string;
  name: string;
  module: string;
  unit: string;
  factorKgCo2PerUnit: number;
  source: string;
};

const normalizeHeader = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const parseNumber = (value: unknown) => {
  if (value === null || value === undefined) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  let normalized = raw.replace(/\s+/g, '');
  const hasComma = normalized.includes(',');
  const hasDot = normalized.includes('.');
  if (hasComma && hasDot) {
    if (normalized.lastIndexOf(',') > normalized.lastIndexOf('.')) {
      normalized = normalized.replace(/\./g, '').replace(',', '.');
    } else {
      normalized = normalized.replace(/,/g, '');
    }
  } else if (hasComma) {
    normalized = normalized.replace(',', '.');
  }
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
};

const slugifyKey = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

function mapRowToFactor(row: unknown[], headerIndex: Record<string, number | null>): ParsedFactorRow | null {
  const getValue = (key: keyof typeof headerIndex) => {
    const index = headerIndex[key];
    if (typeof index !== 'number') return '';
    return row[index];
  };
  const name = String(getValue('name') ?? '').trim();
  const moduleValue = String(getValue('module') ?? '').trim();
  const unit = String(getValue('unit') ?? '').trim();
  const source = String(getValue('source') ?? '').trim();
  const keyValue = String(getValue('key') ?? '').trim();
  const factorValue = parseNumber(getValue('factor'));
  const affaldFactorValue = parseNumber(getValue('wasteFactor'));
  const resolvedFactor = factorValue ?? affaldFactorValue;
  const resolvedName = name;
  const resolvedKey = keyValue || (resolvedName ? slugifyKey(resolvedName) : '');

  if (!resolvedName || !resolvedKey || resolvedFactor === null) {
    return null;
  }

  return {
    key: resolvedKey,
    name: resolvedName,
    module: moduleValue || 'A1-A3',
    unit: unit || 'enhed',
    factorKgCo2PerUnit: resolvedFactor,
    source: source || 'Excel upload',
  };
}

function parseFactorsFromSheet(sheet: XLSX.WorkSheet): ParsedFactorRow[] {
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' }) as unknown[][];
  if (rows.length === 0) return [];
  const headers = rows[0]?.map((value) => String(value ?? '').trim()) ?? [];
  const normalizedHeaders = headers.map((header) => normalizeHeader(header));
  const findIndex = (headerName: string) => {
    const normalized = normalizeHeader(headerName);
    const index = normalizedHeaders.findIndex((item) => item === normalized);
    return index >= 0 ? index : null;
  };
  const headerIndex = {
    name: findIndex('Navn'),
    module: findIndex('Modul'),
    unit: findIndex('Enhed'),
    factor: findIndex('Faktor_kgCO2e_pr_enhed'),
    source: findIndex('Kilde'),
    key: findIndex('Key'),
    wasteFactor: findIndex('Kg_pr_enhed_for_Affald'),
  };

  const parsedRows: ParsedFactorRow[] = [];
  for (const row of rows.slice(1)) {
    const hasValues = row.some((cell) => String(cell ?? '').trim());
    if (!hasValues) continue;
    const factor = mapRowToFactor(row, headerIndex);
    if (factor) parsedRows.push(factor);
  }
  return parsedRows;
}

export default function MaterialerPage() {
  const {
    factors,
    materialer,
    addMateriale,
    getFactorByKey,
    deleteRecord,
    setCustomFactors,
    resetCustomFactors,
    hasCustomFactors,
  } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const availableFactors = useMemo(
    () => getFactorsForCategory(factors, 'materialer', searchTerm),
    [factors, searchTerm]
  );
  const [form, setForm] = useState<MaterialeFormState>({
    dato: today,
    factorKey: '',
    maengde: '',
    produktNote: '',
    leverandoer: '',
    transportmetodeAbc: '',
    transportdistanceKm: '',
  });
  const [error, setError] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (availableFactors.length === 0) {
      if (form.factorKey) {
        setForm((prev) => ({ ...prev, factorKey: '' }));
      }
      return;
    }

    if (!availableFactors.some((item) => item.key === form.factorKey)) {
      setForm((prev) => ({ ...prev, factorKey: availableFactors[0].key }));
    }
  }, [availableFactors, form.factorKey]);

  const faktor = form.factorKey ? getFactorByKey(form.factorKey) : undefined;
  const beregnetCo2 = faktor && form.maengde ? Number(form.maengde) * faktor.factorKgCo2PerUnit : 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const maengdeNumber = Number(form.maengde);
    if (!form.dato || !form.factorKey || Number.isNaN(maengdeNumber) || maengdeNumber <= 0) {
      setError('Udfyld dato, materiale og en positiv mængde.');
      return;
    }
    const factor = getFactorByKey(form.factorKey);
    if (!factor) {
      setError('Den valgte faktor findes ikke.');
      return;
    }
    setError('');
    addMateriale({
      dato: form.dato,
      factorKey: form.factorKey,
      maengde: maengdeNumber,
      produktNote: form.produktNote || undefined,
      leverandoer: form.leverandoer || undefined,
      transportmetodeAbc: form.transportmetodeAbc || undefined,
      transportdistanceKm: form.transportdistanceKm ? Number(form.transportdistanceKm) : undefined,
    });
    setForm((prev) => ({
      ...prev,
      dato: today,
      maengde: '',
      produktNote: '',
      leverandoer: '',
      transportmetodeAbc: '',
      transportdistanceKm: '',
    }));
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Er du sikker på, at du vil slette denne registrering?')) return;
    deleteRecord('materialer', id);
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadError('');
    setUploadMessage('');
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName =
        workbook.SheetNames.find((name) => name.trim().toLowerCase() === 'tabel 7') ?? workbook.SheetNames[0];
      if (!sheetName) {
        setUploadError('Filen indeholder ingen ark.');
        return;
      }
      const sheet = workbook.Sheets[sheetName];
      const parsed = parseFactorsFromSheet(sheet);
      if (parsed.length === 0) {
        setUploadError('Ingen gyldige rækker blev fundet i arket.');
        return;
      }
      const uniqueFactors = new Map<string, Factor>();
      parsed.forEach((item) => {
        uniqueFactors.set(item.key, {
          key: item.key,
          name: item.name,
          module: item.module,
          unit: item.unit,
          factorKgCo2PerUnit: item.factorKgCo2PerUnit,
          source: item.source,
        });
      });
      const factorList = Array.from(uniqueFactors.values());
      setCustomFactors(factorList);
      setUploadMessage(`Indlæst ${factorList.length} faktorer fra "${sheetName}".`);
    } catch (error) {
      console.error('Fejl ved indlæsning af Excel', error);
      setUploadError('Kunne ikke indlæse filen. Tjek at det er en gyldig .xlsx.');
    } finally {
      event.target.value = '';
    }
  };

  const handleResetFactors = () => {
    if (!window.confirm('Nulstil til standardfaktorer? Dette sletter de brugerdefinerede faktorer.')) return;
    resetCustomFactors();
    setUploadMessage('Standardfaktorer er gendannet.');
    setUploadError('');
  };

  return (
    <div>
      <section className="card">
        <h2 className="section-title">Excel upload af emissionsfaktorer</h2>
        <p>
          Upload en .xlsx med kolonnerne Navn, Modul, Enhed, Faktor_kgCO2e_pr_enhed, Kilde, Key og
          Kg_pr_enhed_for_Affald. Hvis arket "Tabel 7" findes, bruges det automatisk.
        </p>
        <div className="form-grid">
          <label>
            Upload Excel (.xlsx)
            <input type="file" accept=".xlsx" onChange={handleUpload} />
          </label>
          <label>
            Aktivt datasæt
            <input type="text" value={hasCustomFactors ? 'Brugerdefinerede faktorer' : 'Standardfaktorer'} readOnly />
          </label>
          <button type="button" className="secondary" onClick={handleResetFactors} disabled={!hasCustomFactors}>
            Nulstil til standard
          </button>
        </div>
        {uploadMessage && <p className="success-text">{uploadMessage}</p>}
        {uploadError && <p className="error-text">{uploadError}</p>}
      </section>

      <section className="card">
        <h2 className="section-title">Registrér materiale</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Dato
            <input
              type="date"
              value={form.dato}
              onChange={(event) => setForm((prev) => ({ ...prev, dato: event.target.value }))}
              required
            />
          </label>
          <label className="full">
            Søg materiale
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Søg efter materiale"
            />
          </label>
          <label>
            Materiale
            <select
              value={form.factorKey}
              onChange={(event) => setForm((prev) => ({ ...prev, factorKey: event.target.value }))}
              required
            >
              <option value="">Vælg materiale</option>
              {availableFactors.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Mængde ({faktor?.unit ?? 'enhed'})
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.maengde}
              onChange={(event) => setForm((prev) => ({ ...prev, maengde: event.target.value }))}
              required
            />
          </label>
          <label>
            Produkt note
            <input
              type="text"
              value={form.produktNote}
              onChange={(event) => setForm((prev) => ({ ...prev, produktNote: event.target.value }))}
            />
          </label>
          <label>
            Leverandør
            <input
              type="text"
              value={form.leverandoer}
              onChange={(event) => setForm((prev) => ({ ...prev, leverandoer: event.target.value }))}
            />
          </label>
          <label>
            Transportmetode (a/b/c)
            <select
              value={form.transportmetodeAbc}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, transportmetodeAbc: event.target.value as '' | 'a' | 'b' | 'c' }))
              }
            >
              <option value="">Ikke angivet</option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
            </select>
          </label>
          <label>
            Transportdistance (km)
            <input
              type="number"
              min="0"
              step="0.1"
              value={form.transportdistanceKm}
              onChange={(event) => setForm((prev) => ({ ...prev, transportdistanceKm: event.target.value }))}
            />
          </label>
          <label>
            CO₂-faktor (kg CO₂e/{faktor?.unit ?? '-'})
            <input type="text" value={faktor?.factorKgCo2PerUnit ?? ''} readOnly />
          </label>
          <label>
            Beregnet CO₂ (kg CO₂e)
            <input type="text" value={beregnetCo2 ? beregnetCo2.toFixed(2) : ''} readOnly />
          </label>
          {error && <span className="error-text">{error}</span>}
          <button type="submit" className="primary">
            Gem materiale
          </button>
        </form>
      </section>

      <section className="card">
        <h2 className="section-title">Registreringer</h2>
        <div className="data-list">
          {materialer.map((post) => (
            <article key={post.id} className="data-card">
              <h3>{post.dato}</h3>
              <p>Materiale: {post.materiale}</p>
              <p>
                Mængde: {post.maengde} {post.enhed}
              </p>
              <p>CO₂: {post.beregnetCo2Kg.toFixed(2)} kg</p>
              {post.produktNote && <p>Note: {post.produktNote}</p>}
              {post.leverandoer && <p>Leverandør: {post.leverandoer}</p>}
              {post.transportmetodeAbc && <p>Transportmetode: {post.transportmetodeAbc.toUpperCase()}</p>}
              {typeof post.transportdistanceKm === 'number' && <p>Transportdistance: {post.transportdistanceKm} km</p>}
              <button type="button" className="danger" onClick={() => handleDelete(post.id)}>
                Slet
              </button>
            </article>
          ))}
          {materialer.length === 0 && <p>Ingen registreringer endnu.</p>}
        </div>
      </section>
    </div>
  );
}
