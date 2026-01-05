import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { read, utils } from 'xlsx';
import type { WorkSheet } from 'xlsx';
import { initialData } from './initialData';
import { FACTORS, Factor } from './factors';
import {
  AddAffald,
  AddBraendstof,
  AddEl,
  AddMateriale,
  AddVand,
  Category,
  DataContextValue,
  DataState,
  ImportResult,
} from './types';

const STORAGE_KEY = 'lca-app-data';
const FORMAT_A_HEADERS = ['Navn', 'Modul', 'Enhed', 'Faktor_kgCO2e_pr_enhed', 'Key'];
const FORMAT_B_HEADERS = ['Navn DK', 'Global Opvarmning, modul A1-A3', 'Deklareret enhed (FU)'];

type ImportFormat = 'format-a' | 'format-b';

function moduleContains(moduleValue: string | undefined, token: string) {
  if (!moduleValue) return false;
  const normalized = moduleValue.replace(/[–—]/g, '-').toUpperCase();
  return normalized.includes(token.replace(/[–—]/g, '-').toUpperCase());
}

const defaultDate = () => new Date().toISOString().slice(0, 10);

function fallbackDate(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : defaultDate();
}

function generateId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
}

function cloneInitial(): DataState {
  return JSON.parse(JSON.stringify(initialData)) as DataState;
}

function normalizeHeader(value: unknown) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/[–—]/g, '-')
    .trim();
}

function parseNumber(value: unknown) {
  if (value === null || value === undefined) return NaN;
  const raw = String(value).trim();
  if (!raw) return NaN;
  const compact = raw.replace(/\s/g, '');
  const normalized = compact.includes(',') && compact.includes('.')
    ? compact.replace(/\./g, '').replace(',', '.')
    : compact.replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : NaN;
}

function getFactor(factors: Factor[], key: string | undefined): Factor | undefined {
  if (!key) return undefined;
  const normalizedKey = key.toLowerCase();
  return factors.find(
    (item) =>
      item.key === key ||
      item.name === key ||
      item.key.toLowerCase() === normalizedKey ||
      item.name.toLowerCase() === normalizedKey
  );
}

function buildEffectiveFactors(uploadedFactors: Factor[]) {
  const baseFactors =
    uploadedFactors.length > 0
      ? FACTORS.filter((factor) => !moduleContains(factor.module, 'A1'))
      : FACTORS;
  const merged = new Map<string, Factor>(baseFactors.map((factor) => [factor.key, factor]));
  uploadedFactors.forEach((factor) => {
    merged.set(factor.key, factor);
  });
  return Array.from(merged.values());
}

function normalizeUploadedFactors(raw: unknown): Factor[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const candidate = item as Partial<Factor>;
      const name = typeof candidate.name === 'string' ? candidate.name.trim() : '';
      const key = typeof candidate.key === 'string' ? candidate.key.trim() : '';
      const module = typeof candidate.module === 'string' ? candidate.module.trim() : '';
      const unit = typeof candidate.unit === 'string' ? candidate.unit.trim() : '';
      const factorValue = parseNumber(candidate.factorKgCo2PerUnit);
      const source = typeof candidate.source === 'string' ? candidate.source.trim() : '';
      if (!name || !key || !unit || !Number.isFinite(factorValue)) return null;
      return {
        key,
        name,
        module,
        unit,
        factorKgCo2PerUnit: factorValue,
        source,
      };
    })
    .filter((item): item is Factor => item !== null);
}

function findHeaderRow(rows: unknown[][]) {
  const maxRows = Math.min(rows.length, 30);
  for (let i = 0; i < maxRows; i += 1) {
    const headers = (rows[i] ?? []).map(normalizeHeader);
    if (FORMAT_A_HEADERS.every((header) => headers.includes(header))) {
      return { format: 'format-a' as const, headers, index: i };
    }
    if (FORMAT_B_HEADERS.every((header) => headers.includes(header))) {
      return { format: 'format-b' as const, headers, index: i };
    }
  }
  return null;
}

function createFactorLookup(factors: Factor[]) {
  const byKey = new Map(factors.map((factor) => [factor.key, factor]));
  const byName = new Map(factors.map((factor) => [factor.name.toLowerCase(), factor]));
  return {
    find: (key?: string, name?: string) => {
      if (key && byKey.has(key)) return byKey.get(key);
      if (key) {
        const normalized = key.toLowerCase();
        if (byName.has(normalized)) return byName.get(normalized);
      }
      if (name) {
        const normalized = name.toLowerCase();
        if (byName.has(normalized)) return byName.get(normalized);
      }
      return undefined;
    },
  };
}

function normalizeElPost(raw: any, factors: Factor[]): DataState['el'][number] {
  if (raw && typeof raw === 'object' && 'factorKey' in raw && 'factorName' in raw) {
    const amount = Number(raw.maengde ?? 0);
    const co2Factor = Number(raw.co2FaktorKgPerEnhed ?? 0);
    const storedCo2 = Number(raw.beregnetCo2Kg);
    return {
      id: typeof raw.id === 'string' ? raw.id : generateId('el'),
      dato: fallbackDate(raw.dato),
      factorKey: String(raw.factorKey ?? ''),
      factorName: String(raw.factorName ?? 'Ukendt faktor'),
      enhed: String(raw.enhed ?? 'enhed'),
      maengde: amount,
      kilde: typeof raw.kilde === 'string' ? raw.kilde : '',
      kommentar: typeof raw.kommentar === 'string' ? raw.kommentar : undefined,
      co2FaktorKgPerEnhed: co2Factor,
      beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
    };
  }

  const fallbackKey = typeof raw?.factorKey === 'string' && raw.factorKey ? raw.factorKey : raw?.type;
  const factor = getFactor(factors, fallbackKey);
  const amount = Number(raw?.maengde ?? 0);
  const co2Factor = factor?.factorKgCo2PerUnit ?? Number(raw?.co2FaktorKgPerEnhed ?? 0);
  const storedCo2 = Number(raw?.beregnetCo2Kg);
  return {
    id: typeof raw?.id === 'string' ? raw.id : generateId('el'),
    dato: fallbackDate(raw?.dato),
    factorKey: factor?.key ?? (typeof fallbackKey === 'string' ? fallbackKey : ''),
    factorName: factor?.name ?? (typeof raw?.type === 'string' ? raw.type : 'Ukendt faktor'),
    enhed: factor?.unit ?? (typeof raw?.enhed === 'string' ? raw.enhed : 'enhed'),
    maengde: amount,
    kilde: typeof raw?.kilde === 'string' ? raw.kilde : '',
    kommentar: typeof raw?.kommentar === 'string' ? raw.kommentar : undefined,
    co2FaktorKgPerEnhed: co2Factor,
    beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
  };
}

function normalizeVandPost(raw: any, factors: Factor[]): DataState['vand'][number] {
  if (raw && typeof raw === 'object' && 'factorKey' in raw && 'factorName' in raw) {
    const amount = Number(raw.maengde ?? 0);
    const co2Factor = Number(raw.co2FaktorKgPerEnhed ?? 0);
    const storedCo2 = Number(raw.beregnetCo2Kg);
    return {
      id: typeof raw.id === 'string' ? raw.id : generateId('vand'),
      dato: fallbackDate(raw.dato),
      factorKey: String(raw.factorKey ?? ''),
      factorName: String(raw.factorName ?? 'Ukendt faktor'),
      enhed: String(raw.enhed ?? 'enhed'),
      maengde: amount,
      kilde: typeof raw.kilde === 'string' ? raw.kilde : '',
      kommentar: typeof raw.kommentar === 'string' ? raw.kommentar : undefined,
      co2FaktorKgPerEnhed: co2Factor,
      beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
    };
  }

  const fallbackKey = typeof raw?.factorKey === 'string' && raw.factorKey ? raw.factorKey : raw?.type;
  const factor = getFactor(factors, fallbackKey);
  const amount = Number(raw?.maengde ?? 0);
  const co2Factor = factor?.factorKgCo2PerUnit ?? Number(raw?.co2FaktorKgPerEnhed ?? 0);
  const storedCo2 = Number(raw?.beregnetCo2Kg);
  return {
    id: typeof raw?.id === 'string' ? raw.id : generateId('vand'),
    dato: fallbackDate(raw?.dato),
    factorKey: factor?.key ?? (typeof fallbackKey === 'string' ? fallbackKey : ''),
    factorName: factor?.name ?? (typeof raw?.type === 'string' ? raw.type : 'Ukendt faktor'),
    enhed: factor?.unit ?? (typeof raw?.enhed === 'string' ? raw.enhed : 'enhed'),
    maengde: amount,
    kilde: typeof raw?.kilde === 'string' ? raw.kilde : '',
    kommentar: typeof raw?.kommentar === 'string' ? raw.kommentar : undefined,
    co2FaktorKgPerEnhed: co2Factor,
    beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
  };
}

function normalizeBraendstofPost(raw: any, factors: Factor[]): DataState['braendstof'][number] {
  if (raw && typeof raw === 'object' && 'factorKey' in raw && 'factorName' in raw) {
    const amount = Number(raw.maengde ?? 0);
    const co2Factor = Number(raw.co2FaktorKgPerEnhed ?? 0);
    const storedCo2 = Number(raw.beregnetCo2Kg);
    return {
      id: typeof raw.id === 'string' ? raw.id : generateId('braendstof'),
      dato: fallbackDate(raw.dato),
      factorKey: String(raw.factorKey ?? ''),
      factorName: String(raw.factorName ?? 'Ukendt faktor'),
      enhed: String(raw.enhed ?? 'enhed'),
      maengde: amount,
      kilde: typeof raw.kilde === 'string' ? raw.kilde : '',
      kommentar: typeof raw.kommentar === 'string' ? raw.kommentar : undefined,
      co2FaktorKgPerEnhed: co2Factor,
      beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
    };
  }

  const fallbackKey = typeof raw?.factorKey === 'string' && raw.factorKey ? raw.factorKey : raw?.type;
  const factor = getFactor(factors, fallbackKey);
  const amount = Number(raw?.maengde ?? 0);
  const co2Factor = factor?.factorKgCo2PerUnit ?? Number(raw?.co2FaktorKgPerEnhed ?? 0);
  const storedCo2 = Number(raw?.beregnetCo2Kg);
  return {
    id: typeof raw?.id === 'string' ? raw.id : generateId('braendstof'),
    dato: fallbackDate(raw?.dato),
    factorKey: factor?.key ?? (typeof fallbackKey === 'string' ? fallbackKey : ''),
    factorName: factor?.name ?? (typeof raw?.type === 'string' ? raw.type : 'Ukendt faktor'),
    enhed: factor?.unit ?? (typeof raw?.enhed === 'string' ? raw.enhed : 'enhed'),
    maengde: amount,
    kilde: typeof raw?.kilde === 'string' ? raw.kilde : '',
    kommentar: typeof raw?.kommentar === 'string' ? raw.kommentar : undefined,
    co2FaktorKgPerEnhed: co2Factor,
    beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
  };
}

function normalizeMaterialePost(raw: any, factors: Factor[]): DataState['materialer'][number] {
  if (raw && typeof raw === 'object' && 'factorKey' in raw) {
    const amount = Number(raw.maengde ?? 0);
    const co2Factor = Number(raw.co2FaktorKgPerEnhed ?? 0);
    const storedCo2 = Number(raw.beregnetCo2Kg);
    const distanceRaw = raw.transportdistanceKm;
    const distanceNumber = Number(distanceRaw);
    const distance =
      distanceRaw === '' || distanceRaw === null || distanceRaw === undefined || Number.isNaN(distanceNumber)
        ? undefined
        : distanceNumber;
    const transportmetode = raw.transportmetodeAbc;
    const normalizedTransport = transportmetode === 'a' || transportmetode === 'b' || transportmetode === 'c'
      ? transportmetode
      : undefined;
    return {
      id: typeof raw.id === 'string' ? raw.id : generateId('materiale'),
      dato: fallbackDate(raw.dato),
      factorKey: String(raw.factorKey ?? ''),
      materiale: String(raw.materiale ?? raw.factorName ?? 'Ukendt materiale'),
      produktNote: typeof raw.produktNote === 'string' && raw.produktNote ? raw.produktNote : undefined,
      enhed: String(raw.enhed ?? 'enhed'),
      maengde: amount,
      leverandoer: typeof raw.leverandoer === 'string' && raw.leverandoer ? raw.leverandoer : undefined,
      transportmetodeAbc: normalizedTransport,
      transportdistanceKm: distance,
      co2FaktorKgPerEnhed: co2Factor,
      beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
    };
  }

  const fallbackKey = typeof raw?.factorKey === 'string' && raw.factorKey ? raw.factorKey : raw?.materiale;
  const factor = getFactor(factors, fallbackKey);
  const amount = Number(raw?.maengde ?? 0);
  const co2Factor = factor?.factorKgCo2PerUnit ?? Number(raw?.co2FaktorKgPerEnhed ?? 0);
  const storedCo2 = Number(raw?.beregnetCo2Kg);
  const distanceRaw = raw?.transportdistanceKm;
  const distanceNumber = Number(distanceRaw);
  const distance =
    distanceRaw === '' || distanceRaw === null || distanceRaw === undefined || Number.isNaN(distanceNumber)
      ? undefined
      : distanceNumber;
  const transportmetode = raw?.transportmetodeAbc;
  const normalizedTransport = transportmetode === 'a' || transportmetode === 'b' || transportmetode === 'c'
    ? transportmetode
    : undefined;
  return {
    id: typeof raw?.id === 'string' ? raw.id : generateId('materiale'),
    dato: fallbackDate(raw?.dato),
    factorKey: factor?.key ?? (typeof fallbackKey === 'string' ? fallbackKey : ''),
    materiale: factor?.name ?? (typeof raw?.materiale === 'string' ? raw.materiale : 'Ukendt materiale'),
    produktNote: typeof raw?.produktNote === 'string' && raw.produktNote ? raw.produktNote : undefined,
    enhed: factor?.unit ?? (typeof raw?.enhed === 'string' ? raw.enhed : 'enhed'),
    maengde: amount,
    leverandoer: typeof raw?.leverandoer === 'string' && raw.leverandoer ? raw.leverandoer : undefined,
    transportmetodeAbc: normalizedTransport,
    transportdistanceKm: distance,
    co2FaktorKgPerEnhed: co2Factor,
    beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
  };
}

function normalizeAffaldPost(raw: any, factors: Factor[]): DataState['affald'][number] {
  if (raw && typeof raw === 'object' && 'factorKey' in raw) {
    const amount = Number(raw.maengde ?? 0);
    const co2Factor = Number(raw.co2FaktorKgPerEnhed ?? 0);
    const storedCo2 = Number(raw.beregnetCo2Kg);
    const genanvendelseRaw = raw.genanvendelseProcent;
    const genanvendelseNumber = Number(genanvendelseRaw);
    const genanvendelse =
      genanvendelseRaw === '' || genanvendelseRaw === null || genanvendelseRaw === undefined || Number.isNaN(genanvendelseNumber)
        ? undefined
        : genanvendelseNumber;
    const spild = typeof raw.erSpild === 'boolean' ? raw.erSpild : String(raw.erSpild).toLowerCase() === 'true';
    return {
      id: typeof raw.id === 'string' ? raw.id : generateId('affald'),
      dato: fallbackDate(raw.dato),
      factorKey: String(raw.factorKey ?? ''),
      fraktion: String(raw.fraktion ?? raw.factorName ?? 'Ukendt fraktion'),
      enhed: String(raw.enhed ?? 'enhed'),
      maengde: amount,
      modtager: typeof raw.modtager === 'string' && raw.modtager ? raw.modtager : undefined,
      genanvendelseProcent: genanvendelse,
      kommentar: typeof raw.kommentar === 'string' ? raw.kommentar : undefined,
      co2FaktorKgPerEnhed: co2Factor,
      beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
      erSpild: spild,
    };
  }

  const fallbackKey = typeof raw?.factorKey === 'string' && raw.factorKey ? raw.factorKey : raw?.fraktion;
  const factor = getFactor(factors, fallbackKey);
  const amount = Number(raw?.maengde ?? 0);
  const co2Factor = factor?.factorKgCo2PerUnit ?? Number(raw?.co2FaktorKgPerEnhed ?? 0);
  const storedCo2 = Number(raw?.beregnetCo2Kg);
  const genanvendelseRaw = raw?.genanvendelseProcent;
  const genanvendelseNumber = Number(genanvendelseRaw);
  const genanvendelse =
    genanvendelseRaw === '' || genanvendelseRaw === null || genanvendelseRaw === undefined || Number.isNaN(genanvendelseNumber)
      ? undefined
      : genanvendelseNumber;
  const spild = typeof raw?.erSpild === 'boolean' ? raw.erSpild : String(raw?.erSpild).toLowerCase() === 'true';
  return {
    id: typeof raw?.id === 'string' ? raw.id : generateId('affald'),
    dato: fallbackDate(raw?.dato),
    factorKey: factor?.key ?? (typeof fallbackKey === 'string' ? fallbackKey : ''),
    fraktion: factor?.name ?? (typeof raw?.fraktion === 'string' ? raw.fraktion : 'Ukendt fraktion'),
    enhed: factor?.unit ?? (typeof raw?.enhed === 'string' ? raw.enhed : 'enhed'),
    maengde: amount,
    modtager: typeof raw?.modtager === 'string' && raw.modtager ? raw.modtager : undefined,
    genanvendelseProcent: genanvendelse,
    kommentar: typeof raw?.kommentar === 'string' ? raw.kommentar : undefined,
    co2FaktorKgPerEnhed: co2Factor,
    beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
    erSpild: spild,
  };
}

function migrateState(raw: Partial<DataState> | null | undefined): DataState {
  const defaults = cloneInitial();
  const uploadedFactors = normalizeUploadedFactors(raw?.uploadedFactors ?? defaults.uploadedFactors);
  const effectiveFactors = buildEffectiveFactors(uploadedFactors);
  return {
    el: (raw?.el ?? defaults.el).map((item) => normalizeElPost(item, effectiveFactors)),
    vand: (raw?.vand ?? defaults.vand).map((item) => normalizeVandPost(item, effectiveFactors)),
    braendstof: (raw?.braendstof ?? defaults.braendstof).map((item) => normalizeBraendstofPost(item, effectiveFactors)),
    materialer: (raw?.materialer ?? defaults.materialer).map((item) => normalizeMaterialePost(item, effectiveFactors)),
    affald: (raw?.affald ?? defaults.affald).map((item) => normalizeAffaldPost(item, effectiveFactors)),
    bygning: {
      projektNavn:
        typeof raw?.bygning?.projektNavn === 'string' && raw.bygning.projektNavn.trim()
          ? raw.bygning.projektNavn
          : defaults.bygning.projektNavn,
      bygningArealM2:
        typeof raw?.bygning?.bygningArealM2 === 'number' && raw.bygning.bygningArealM2 >= 0
          ? raw.bygning.bygningArealM2
          : defaults.bygning.bygningArealM2,
    },
    uploadedFactors,
  };
}

function loadState(): DataState {
  if (typeof window === 'undefined') {
    return cloneInitial();
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return cloneInitial();
    }
    const parsed = JSON.parse(stored) as Partial<DataState> | null;
    return migrateState(parsed);
  } catch (error) {
    console.warn('Kunne ikke indlæse data fra localStorage', error);
    return cloneInitial();
  }
}

function recalculateRecords(state: DataState, factors: Factor[]): DataState {
  const lookup = createFactorLookup(factors);
  const updateWithFactor = (factor: Factor | undefined, amount: number) => {
    if (!factor) return null;
    const beregnet = Number((amount * factor.factorKgCo2PerUnit).toFixed(3));
    return {
      factorKey: factor.key,
      factorName: factor.name,
      enhed: factor.unit,
      co2FaktorKgPerEnhed: factor.factorKgCo2PerUnit,
      beregnetCo2Kg: beregnet,
    };
  };

  return {
    ...state,
    el: state.el.map((post) => {
      const factor = lookup.find(post.factorKey, post.factorName);
      const updated = updateWithFactor(factor, Number(post.maengde ?? 0));
      return updated ? { ...post, ...updated } : post;
    }),
    vand: state.vand.map((post) => {
      const factor = lookup.find(post.factorKey, post.factorName);
      const updated = updateWithFactor(factor, Number(post.maengde ?? 0));
      return updated ? { ...post, ...updated } : post;
    }),
    braendstof: state.braendstof.map((post) => {
      const factor = lookup.find(post.factorKey, post.factorName);
      const updated = updateWithFactor(factor, Number(post.maengde ?? 0));
      return updated ? { ...post, ...updated } : post;
    }),
    materialer: state.materialer.map((post) => {
      const factor = lookup.find(post.factorKey, post.materiale);
      if (!factor) return post;
      return {
        ...post,
        factorKey: factor.key,
        materiale: factor.name,
        enhed: factor.unit,
        co2FaktorKgPerEnhed: factor.factorKgCo2PerUnit,
        beregnetCo2Kg: Number((Number(post.maengde ?? 0) * factor.factorKgCo2PerUnit).toFixed(3)),
      };
    }),
    affald: state.affald.map((post) => {
      const factor = lookup.find(post.factorKey, post.fraktion);
      if (!factor) return post;
      return {
        ...post,
        factorKey: factor.key,
        fraktion: factor.name,
        enhed: factor.unit,
        co2FaktorKgPerEnhed: factor.factorKgCo2PerUnit,
        beregnetCo2Kg: Number((Number(post.maengde ?? 0) * factor.factorKgCo2PerUnit).toFixed(3)),
      };
    }),
  };
}

function parseFactorsFromSheet(sheet: WorkSheet): {
  format: ImportFormat;
  factors: Factor[];
  skipped: number;
} {
  const rows = utils.sheet_to_json<unknown[]>(sheet, { header: 1, defval: '' });
  const headerInfo = findHeaderRow(rows);
  if (!headerInfo) {
    throw new Error('Kunne ikke finde en header-række med de forventede kolonner.');
  }

  const { format, headers, index } = headerInfo;
  const dataRows = rows.slice(index + 1);
  const factors: Factor[] = [];
  let skipped = 0;

  dataRows.forEach((row) => {
    if (!row || row.length === 0) return;
    const record: Record<string, unknown> = {};
    headers.forEach((header, colIndex) => {
      if (header) {
        record[header] = row[colIndex];
      }
    });

    if (format === 'format-a') {
      const name = String(record['Navn'] ?? '').trim();
      const module = String(record['Modul'] ?? '').trim();
      const unit = String(record['Enhed'] ?? '').trim();
      const key = String(record['Key'] ?? '').trim() || `${name}|${module}`;
      const factorValue = parseNumber(record['Faktor_kgCO2e_pr_enhed']);
      if (!name || !unit || !Number.isFinite(factorValue)) {
        skipped += 1;
        return;
      }
      factors.push({
        key,
        name,
        module,
        unit,
        factorKgCo2PerUnit: factorValue,
        source: 'Upload',
      });
      return;
    }

    const name = String(record['Navn DK'] ?? '').trim();
    const unit = String(record['Deklareret enhed (FU)'] ?? '').trim();
    const factorValue = parseNumber(record['Global Opvarmning, modul A1-A3']);
    if (!name || !unit || !Number.isFinite(factorValue)) {
      skipped += 1;
      return;
    }
    const module = 'A1–A3';
    factors.push({
      key: `${name}|${module}`,
      name,
      module,
      unit,
      factorKgCo2PerUnit: factorValue,
      source: 'BR2025 Tabel 7 (upload)',
    });
  });

  return { format, factors, skipped };
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DataState>(() => loadState());
  const effectiveFactors = useMemo(
    () => buildEffectiveFactors(state.uploadedFactors),
    [state.uploadedFactors]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addEl = (input: AddEl) => {
    const factor = getFactor(effectiveFactors, input.factorKey);
    if (!factor) return;
    const post = {
      id: generateId('el'),
      dato: input.dato,
      factorKey: factor.key,
      factorName: factor.name,
      enhed: factor.unit,
      maengde: input.maengde,
      kilde: input.kilde,
      kommentar: input.kommentar,
      co2FaktorKgPerEnhed: factor.factorKgCo2PerUnit,
      beregnetCo2Kg: Number((input.maengde * factor.factorKgCo2PerUnit).toFixed(3)),
    };
    setState((prev) => ({ ...prev, el: [post, ...prev.el] }));
  };

  const addVand = (input: AddVand) => {
    const factor = getFactor(effectiveFactors, input.factorKey);
    if (!factor) return;
    const post = {
      id: generateId('vand'),
      dato: input.dato,
      factorKey: factor.key,
      factorName: factor.name,
      enhed: factor.unit,
      maengde: input.maengde,
      kilde: input.kilde,
      kommentar: input.kommentar,
      co2FaktorKgPerEnhed: factor.factorKgCo2PerUnit,
      beregnetCo2Kg: Number((input.maengde * factor.factorKgCo2PerUnit).toFixed(3)),
    };
    setState((prev) => ({ ...prev, vand: [post, ...prev.vand] }));
  };

  const addBraendstof = (input: AddBraendstof) => {
    const factor = getFactor(effectiveFactors, input.factorKey);
    if (!factor) return;
    const post = {
      id: generateId('braendstof'),
      dato: input.dato,
      factorKey: factor.key,
      factorName: factor.name,
      enhed: factor.unit,
      maengde: input.maengde,
      kilde: input.kilde,
      kommentar: input.kommentar,
      co2FaktorKgPerEnhed: factor.factorKgCo2PerUnit,
      beregnetCo2Kg: Number((input.maengde * factor.factorKgCo2PerUnit).toFixed(3)),
    };
    setState((prev) => ({ ...prev, braendstof: [post, ...prev.braendstof] }));
  };

  const addMateriale = (input: AddMateriale) => {
    const factor = getFactor(effectiveFactors, input.factorKey);
    if (!factor) return;
    const post = {
      id: generateId('materiale'),
      dato: input.dato,
      factorKey: factor.key,
      materiale: factor.name,
      produktNote: input.produktNote,
      enhed: factor.unit,
      maengde: input.maengde,
      leverandoer: input.leverandoer,
      transportmetodeAbc: input.transportmetodeAbc,
      transportdistanceKm: input.transportdistanceKm,
      co2FaktorKgPerEnhed: factor.factorKgCo2PerUnit,
      beregnetCo2Kg: Number((input.maengde * factor.factorKgCo2PerUnit).toFixed(3)),
    };
    setState((prev) => ({ ...prev, materialer: [post, ...prev.materialer] }));
  };

  const addAffald = (input: AddAffald) => {
    const factor = getFactor(effectiveFactors, input.factorKey);
    if (!factor) return;
    const post = {
      id: generateId('affald'),
      dato: input.dato,
      factorKey: factor.key,
      fraktion: factor.name,
      enhed: factor.unit,
      maengde: input.maengde,
      modtager: input.modtager,
      genanvendelseProcent: input.genanvendelseProcent,
      kommentar: input.kommentar,
      co2FaktorKgPerEnhed: factor.factorKgCo2PerUnit,
      beregnetCo2Kg: Number((input.maengde * factor.factorKgCo2PerUnit).toFixed(3)),
      erSpild: input.erSpild,
    };
    setState((prev) => ({ ...prev, affald: [post, ...prev.affald] }));
  };

  const deleteRecord = (category: Category, id: string) => {
    setState((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id),
    }));
  };

  const updateBygning = (info: DataState['bygning']) => {
    setState((prev) => ({ ...prev, bygning: info }));
  };

  const importFactors = async (file: File): Promise<ImportResult> => {
    const buffer = await file.arrayBuffer();
    const workbook = read(buffer, { type: 'array' });
    const sheetName = workbook.SheetNames.includes('Sheet1') ? 'Sheet1' : workbook.SheetNames[0];
    if (!sheetName) {
      throw new Error('Regnearket indeholder ingen sheets.');
    }
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      throw new Error('Kunne ikke finde et ark at importere fra.');
    }
    const parsed = parseFactorsFromSheet(sheet);
    const nextFactors = parsed.factors;
    const nextEffective = buildEffectiveFactors(nextFactors);
    setState((prev) => recalculateRecords({ ...prev, uploadedFactors: nextFactors }, nextEffective));
    return {
      format: parsed.format === 'format-a' ? 'Format A' : 'Format B',
      imported: nextFactors.length,
      skipped: parsed.skipped,
    };
  };

  const value: DataContextValue = useMemo(
    () => ({
      ...state,
      factors: effectiveFactors,
      addEl,
      addVand,
      addBraendstof,
      addMateriale,
      addAffald,
      deleteRecord,
      updateBygning,
      getFactorByKey: (key: string) => getFactor(effectiveFactors, key),
      importFactors,
    }),
    [state, effectiveFactors]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData skal bruges inden for en DataProvider');
  }
  return context;
}
