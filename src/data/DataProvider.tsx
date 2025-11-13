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

function getFactor(key: string | undefined): Factor | undefined {
  if (!key) return undefined;
  return FACTORS.find((item) => item.key === key || item.name === key);
}

function normalizeElPost(raw: any): DataState['el'][number] {
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
  const factor = getFactor(fallbackKey);
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

function normalizeVandPost(raw: any): DataState['vand'][number] {
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
  const factor = getFactor(fallbackKey);
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

function normalizeBraendstofPost(raw: any): DataState['braendstof'][number] {
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
  const factor = getFactor(fallbackKey);
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

function normalizeMaterialePost(raw: any): DataState['materialer'][number] {
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
  const factor = getFactor(fallbackKey);
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

function normalizeAffaldPost(raw: any): DataState['affald'][number] {
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
  const factor = getFactor(fallbackKey);
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
  return {
    el: (raw?.el ?? defaults.el).map(normalizeElPost),
    vand: (raw?.vand ?? defaults.vand).map(normalizeVandPost),
    braendstof: (raw?.braendstof ?? defaults.braendstof).map(normalizeBraendstofPost),
    materialer: (raw?.materialer ?? defaults.materialer).map(normalizeMaterialePost),
    affald: (raw?.affald ?? defaults.affald).map(normalizeAffaldPost),
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

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DataState>(() => loadState());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addEl = (input: AddEl) => {
    const factor = getFactor(input.factorKey);
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
    const factor = getFactor(input.factorKey);
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
    const factor = getFactor(input.factorKey);
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
    const factor = getFactor(input.factorKey);
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
    const factor = getFactor(input.factorKey);
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

  const value: DataContextValue = useMemo(
    () => ({
      ...state,
      factors: FACTORS,
      addEl,
      addVand,
      addBraendstof,
      addMateriale,
      addAffald,
      deleteRecord,
      updateBygning,
      getFactorByKey: (key: string) => getFactor(key),
    }),
    [state]
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
