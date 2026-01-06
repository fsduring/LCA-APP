import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
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
} from './types';

const STORAGE_KEY = 'lca-app-data';
const FACTORS_STORAGE_KEY = 'lca_factors';

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

function getFactorFromList(factors: Factor[], key: string | undefined): Factor | undefined {
  if (!key) return undefined;
  return factors.find((item) => item.key === key || item.name === key);
}

function normalizeFactor(raw: any): Factor | null {
  if (!raw || typeof raw !== 'object') return null;
  const key = String(raw.key ?? '').trim();
  const name = String(raw.name ?? '').trim();
  const module = String(raw.module ?? '').trim();
  const unit = String(raw.unit ?? '').trim();
  const source = String(raw.source ?? '').trim();
  const factorValue = Number(raw.factorKgCo2PerUnit ?? raw.factor_kgco2e_pr_enhed ?? raw.faktor_kgco2e_pr_enhed ?? 0);
  if (!key || !name || !module || !unit || Number.isNaN(factorValue)) {
    return null;
  }
  return {
    key,
    name,
    module,
    unit,
    factorKgCo2PerUnit: factorValue,
    source: source || 'Import',
  };
}

function loadFactors(): Factor[] {
  if (typeof window === 'undefined') {
    return [...FACTORS];
  }
  try {
    const stored = window.localStorage.getItem(FACTORS_STORAGE_KEY);
    if (!stored) {
      return [...FACTORS];
    }
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [...FACTORS];
    }
    const normalized = parsed.map(normalizeFactor).filter(Boolean) as Factor[];
    return normalized.length > 0 ? normalized : [...FACTORS];
  } catch (error) {
    console.warn('Kunne ikke indlæse faktorer fra localStorage', error);
    return [...FACTORS];
  }
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
  const factor = getFactorFromList(factors, fallbackKey);
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
  const factor = getFactorFromList(factors, fallbackKey);
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
  const factor = getFactorFromList(factors, fallbackKey);
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
  const factor = getFactorFromList(factors, fallbackKey);
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
  const factor = getFactorFromList(factors, fallbackKey);
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

function migrateState(raw: Partial<DataState> | null | undefined, factors: Factor[]): DataState {
  const defaults = cloneInitial();
  return {
    el: (raw?.el ?? defaults.el).map((item) => normalizeElPost(item, factors)),
    vand: (raw?.vand ?? defaults.vand).map((item) => normalizeVandPost(item, factors)),
    braendstof: (raw?.braendstof ?? defaults.braendstof).map((item) => normalizeBraendstofPost(item, factors)),
    materialer: (raw?.materialer ?? defaults.materialer).map((item) => normalizeMaterialePost(item, factors)),
    affald: (raw?.affald ?? defaults.affald).map((item) => normalizeAffaldPost(item, factors)),
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
  };
}

function loadState(factors: Factor[]): DataState {
  if (typeof window === 'undefined') {
    return cloneInitial();
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return cloneInitial();
    }
    const parsed = JSON.parse(stored) as Partial<DataState> | null;
    return migrateState(parsed, factors);
  } catch (error) {
    console.warn('Kunne ikke indlæse data fra localStorage', error);
    return cloneInitial();
  }
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [factors, setFactors] = useState<Factor[]>(() => loadFactors());
  const [state, setState] = useState<DataState>(() => loadState(factors));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(FACTORS_STORAGE_KEY, JSON.stringify(factors));
  }, [factors]);

  const addEl = (input: AddEl) => {
    const factor = getFactorFromList(factors, input.factorKey);
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
    const factor = getFactorFromList(factors, input.factorKey);
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
    const factor = getFactorFromList(factors, input.factorKey);
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
    const factor = getFactorFromList(factors, input.factorKey);
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
    const factor = getFactorFromList(factors, input.factorKey);
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

  const updateFactors = (nextFactors: Factor[]) => {
    setFactors(nextFactors);
  };

  const resetFactors = () => {
    setFactors([...FACTORS]);
  };

  const value: DataContextValue = useMemo(
    () => ({
      ...state,
      factors,
      updateFactors,
      resetFactors,
      addEl,
      addVand,
      addBraendstof,
      addMateriale,
      addAffald,
      deleteRecord,
      updateBygning,
      getFactorByKey: (key: string) => getFactorFromList(factors, key),
    }),
    [factors, state]
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
