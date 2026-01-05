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

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | undefined {
  return value && typeof value === 'object' ? (value as UnknownRecord) : undefined;
}

function readString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function cloneInitial(): DataState {
  return JSON.parse(JSON.stringify(initialData)) as DataState;
}

function getFactor(factors: Factor[], key: string | undefined): Factor | undefined {
  if (!key) return undefined;
  return factors.find((item) => item.key === key || item.name === key);
}

function normalizeElPost(raw: unknown, factors: Factor[]): DataState['el'][number] {
  const record = asRecord(raw);
  if (record && 'factorKey' in record && 'factorName' in record) {
    const amount = Number(record.maengde ?? 0);
    const co2Factor = Number(record.co2FaktorKgPerEnhed ?? 0);
    const storedCo2 = Number(record.beregnetCo2Kg);
    return {
      id: typeof record.id === 'string' ? record.id : generateId('el'),
      dato: fallbackDate(record.dato),
      factorKey: String(record.factorKey ?? ''),
      factorName: String(record.factorName ?? 'Ukendt faktor'),
      enhed: String(record.enhed ?? 'enhed'),
      maengde: amount,
      kilde: typeof record.kilde === 'string' ? record.kilde : '',
      kommentar: typeof record.kommentar === 'string' ? record.kommentar : undefined,
      co2FaktorKgPerEnhed: co2Factor,
      beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
    };
  }

  const fallbackKey = readString(record?.factorKey) ?? readString(record?.type);
  const factor = getFactor(factors, fallbackKey);
  const amount = Number(record?.maengde ?? 0);
  const co2Factor = factor?.factorKgCo2PerUnit ?? Number(record?.co2FaktorKgPerEnhed ?? 0);
  const storedCo2 = Number(record?.beregnetCo2Kg);
  return {
    id: typeof record?.id === 'string' ? record.id : generateId('el'),
    dato: fallbackDate(record?.dato),
    factorKey: factor?.key ?? (typeof fallbackKey === 'string' ? fallbackKey : ''),
    factorName: factor?.name ?? (readString(record?.type) ?? 'Ukendt faktor'),
    enhed: factor?.unit ?? (typeof record?.enhed === 'string' ? record.enhed : 'enhed'),
    maengde: amount,
    kilde: typeof record?.kilde === 'string' ? record.kilde : '',
    kommentar: typeof record?.kommentar === 'string' ? record.kommentar : undefined,
    co2FaktorKgPerEnhed: co2Factor,
    beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
  };
}

function normalizeVandPost(raw: unknown, factors: Factor[]): DataState['vand'][number] {
  const record = asRecord(raw);
  if (record && 'factorKey' in record && 'factorName' in record) {
    const amount = Number(record.maengde ?? 0);
    const co2Factor = Number(record.co2FaktorKgPerEnhed ?? 0);
    const storedCo2 = Number(record.beregnetCo2Kg);
    return {
      id: typeof record.id === 'string' ? record.id : generateId('vand'),
      dato: fallbackDate(record.dato),
      factorKey: String(record.factorKey ?? ''),
      factorName: String(record.factorName ?? 'Ukendt faktor'),
      enhed: String(record.enhed ?? 'enhed'),
      maengde: amount,
      kilde: typeof record.kilde === 'string' ? record.kilde : '',
      kommentar: typeof record.kommentar === 'string' ? record.kommentar : undefined,
      co2FaktorKgPerEnhed: co2Factor,
      beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
    };
  }

  const fallbackKey = readString(record?.factorKey) ?? readString(record?.type);
  const factor = getFactor(factors, fallbackKey);
  const amount = Number(record?.maengde ?? 0);
  const co2Factor = factor?.factorKgCo2PerUnit ?? Number(record?.co2FaktorKgPerEnhed ?? 0);
  const storedCo2 = Number(record?.beregnetCo2Kg);
  return {
    id: typeof record?.id === 'string' ? record.id : generateId('vand'),
    dato: fallbackDate(record?.dato),
    factorKey: factor?.key ?? (typeof fallbackKey === 'string' ? fallbackKey : ''),
    factorName: factor?.name ?? (readString(record?.type) ?? 'Ukendt faktor'),
    enhed: factor?.unit ?? (typeof record?.enhed === 'string' ? record.enhed : 'enhed'),
    maengde: amount,
    kilde: typeof record?.kilde === 'string' ? record.kilde : '',
    kommentar: typeof record?.kommentar === 'string' ? record.kommentar : undefined,
    co2FaktorKgPerEnhed: co2Factor,
    beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
  };
}

function normalizeBraendstofPost(raw: unknown, factors: Factor[]): DataState['braendstof'][number] {
  const record = asRecord(raw);
  if (record && 'factorKey' in record && 'factorName' in record) {
    const amount = Number(record.maengde ?? 0);
    const co2Factor = Number(record.co2FaktorKgPerEnhed ?? 0);
    const storedCo2 = Number(record.beregnetCo2Kg);
    return {
      id: typeof record.id === 'string' ? record.id : generateId('braendstof'),
      dato: fallbackDate(record.dato),
      factorKey: String(record.factorKey ?? ''),
      factorName: String(record.factorName ?? 'Ukendt faktor'),
      enhed: String(record.enhed ?? 'enhed'),
      maengde: amount,
      kilde: typeof record.kilde === 'string' ? record.kilde : '',
      kommentar: typeof record.kommentar === 'string' ? record.kommentar : undefined,
      co2FaktorKgPerEnhed: co2Factor,
      beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
    };
  }

  const fallbackKey = readString(record?.factorKey) ?? readString(record?.type);
  const factor = getFactor(factors, fallbackKey);
  const amount = Number(record?.maengde ?? 0);
  const co2Factor = factor?.factorKgCo2PerUnit ?? Number(record?.co2FaktorKgPerEnhed ?? 0);
  const storedCo2 = Number(record?.beregnetCo2Kg);
  return {
    id: typeof record?.id === 'string' ? record.id : generateId('braendstof'),
    dato: fallbackDate(record?.dato),
    factorKey: factor?.key ?? (typeof fallbackKey === 'string' ? fallbackKey : ''),
    factorName: factor?.name ?? (readString(record?.type) ?? 'Ukendt faktor'),
    enhed: factor?.unit ?? (typeof record?.enhed === 'string' ? record.enhed : 'enhed'),
    maengde: amount,
    kilde: typeof record?.kilde === 'string' ? record.kilde : '',
    kommentar: typeof record?.kommentar === 'string' ? record.kommentar : undefined,
    co2FaktorKgPerEnhed: co2Factor,
    beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
  };
}

function normalizeMaterialePost(raw: unknown, factors: Factor[]): DataState['materialer'][number] {
  const record = asRecord(raw);
  if (record && 'factorKey' in record) {
    const amount = Number(record.maengde ?? 0);
    const co2Factor = Number(record.co2FaktorKgPerEnhed ?? 0);
    const storedCo2 = Number(record.beregnetCo2Kg);
    const distanceRaw = record.transportdistanceKm;
    const distanceNumber = Number(distanceRaw);
    const distance =
      distanceRaw === '' || distanceRaw === null || distanceRaw === undefined || Number.isNaN(distanceNumber)
        ? undefined
        : distanceNumber;
    const transportmetode = record.transportmetodeAbc;
    const normalizedTransport = transportmetode === 'a' || transportmetode === 'b' || transportmetode === 'c'
      ? transportmetode
      : undefined;
    return {
      id: typeof record.id === 'string' ? record.id : generateId('materiale'),
      dato: fallbackDate(record.dato),
      factorKey: String(record.factorKey ?? ''),
      materiale: String(record.materiale ?? record.factorName ?? 'Ukendt materiale'),
      produktNote: typeof record.produktNote === 'string' && record.produktNote ? record.produktNote : undefined,
      enhed: String(record.enhed ?? 'enhed'),
      maengde: amount,
      leverandoer: typeof record.leverandoer === 'string' && record.leverandoer ? record.leverandoer : undefined,
      transportmetodeAbc: normalizedTransport,
      transportdistanceKm: distance,
      co2FaktorKgPerEnhed: co2Factor,
      beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
    };
  }

  const fallbackKey = readString(record?.factorKey) ?? readString(record?.materiale);
  const factor = getFactor(factors, fallbackKey);
  const amount = Number(record?.maengde ?? 0);
  const co2Factor = factor?.factorKgCo2PerUnit ?? Number(record?.co2FaktorKgPerEnhed ?? 0);
  const storedCo2 = Number(record?.beregnetCo2Kg);
  const distanceRaw = record?.transportdistanceKm;
  const distanceNumber = Number(distanceRaw);
  const distance =
    distanceRaw === '' || distanceRaw === null || distanceRaw === undefined || Number.isNaN(distanceNumber)
      ? undefined
      : distanceNumber;
  const transportmetode = record?.transportmetodeAbc;
  const normalizedTransport = transportmetode === 'a' || transportmetode === 'b' || transportmetode === 'c'
    ? transportmetode
    : undefined;
  return {
    id: typeof record?.id === 'string' ? record.id : generateId('materiale'),
    dato: fallbackDate(record?.dato),
    factorKey: factor?.key ?? (typeof fallbackKey === 'string' ? fallbackKey : ''),
    materiale: factor?.name ?? (readString(record?.materiale) ?? 'Ukendt materiale'),
    produktNote: typeof record?.produktNote === 'string' && record.produktNote ? record.produktNote : undefined,
    enhed: factor?.unit ?? (typeof record?.enhed === 'string' ? record.enhed : 'enhed'),
    maengde: amount,
    leverandoer: typeof record?.leverandoer === 'string' && record.leverandoer ? record.leverandoer : undefined,
    transportmetodeAbc: normalizedTransport,
    transportdistanceKm: distance,
    co2FaktorKgPerEnhed: co2Factor,
    beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
  };
}

function normalizeAffaldPost(raw: unknown, factors: Factor[]): DataState['affald'][number] {
  const record = asRecord(raw);
  if (record && 'factorKey' in record) {
    const amount = Number(record.maengde ?? 0);
    const co2Factor = Number(record.co2FaktorKgPerEnhed ?? 0);
    const storedCo2 = Number(record.beregnetCo2Kg);
    const genanvendelseRaw = record.genanvendelseProcent;
    const genanvendelseNumber = Number(genanvendelseRaw);
    const genanvendelse =
      genanvendelseRaw === '' || genanvendelseRaw === null || genanvendelseRaw === undefined || Number.isNaN(genanvendelseNumber)
        ? undefined
        : genanvendelseNumber;
    const spild = typeof record.erSpild === 'boolean' ? record.erSpild : String(record.erSpild).toLowerCase() === 'true';
    return {
      id: typeof record.id === 'string' ? record.id : generateId('affald'),
      dato: fallbackDate(record.dato),
      factorKey: String(record.factorKey ?? ''),
      fraktion: String(record.fraktion ?? record.factorName ?? 'Ukendt fraktion'),
      enhed: String(record.enhed ?? 'enhed'),
      maengde: amount,
      modtager: typeof record.modtager === 'string' && record.modtager ? record.modtager : undefined,
      genanvendelseProcent: genanvendelse,
      kommentar: typeof record.kommentar === 'string' ? record.kommentar : undefined,
      co2FaktorKgPerEnhed: co2Factor,
      beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
      erSpild: spild,
    };
  }

  const fallbackKey = readString(record?.factorKey) ?? readString(record?.fraktion);
  const factor = getFactor(factors, fallbackKey);
  const amount = Number(record?.maengde ?? 0);
  const co2Factor = factor?.factorKgCo2PerUnit ?? Number(record?.co2FaktorKgPerEnhed ?? 0);
  const storedCo2 = Number(record?.beregnetCo2Kg);
  const genanvendelseRaw = record?.genanvendelseProcent;
  const genanvendelseNumber = Number(genanvendelseRaw);
  const genanvendelse =
    genanvendelseRaw === '' || genanvendelseRaw === null || genanvendelseRaw === undefined || Number.isNaN(genanvendelseNumber)
      ? undefined
      : genanvendelseNumber;
  const spild = typeof record?.erSpild === 'boolean' ? record.erSpild : String(record?.erSpild).toLowerCase() === 'true';
  return {
    id: typeof record?.id === 'string' ? record.id : generateId('affald'),
    dato: fallbackDate(record?.dato),
    factorKey: factor?.key ?? (typeof fallbackKey === 'string' ? fallbackKey : ''),
    fraktion: factor?.name ?? (readString(record?.fraktion) ?? 'Ukendt fraktion'),
    enhed: factor?.unit ?? (typeof record?.enhed === 'string' ? record.enhed : 'enhed'),
    maengde: amount,
    modtager: typeof record?.modtager === 'string' && record.modtager ? record.modtager : undefined,
    genanvendelseProcent: genanvendelse,
    kommentar: typeof record?.kommentar === 'string' ? record.kommentar : undefined,
    co2FaktorKgPerEnhed: co2Factor,
    beregnetCo2Kg: Number((Number.isFinite(storedCo2) ? storedCo2 : amount * co2Factor).toFixed(3)),
    erSpild: spild,
  };
}

function normalizeFactorList(raw: unknown): Factor[] {
  if (!Array.isArray(raw)) {
    return FACTORS;
  }

  const normalized = raw
    .map((item) => {
      if (!item || typeof item !== 'object') return undefined;
      const record = item as Partial<Factor>;
      const parsedFactor = Number(record.factorKgCo2PerUnit);
      if (!record.key || !record.name || !record.unit || !Number.isFinite(parsedFactor)) {
        return undefined;
      }
      return {
        key: String(record.key),
        name: String(record.name),
        module: String(record.module ?? ''),
        unit: String(record.unit),
        factorKgCo2PerUnit: parsedFactor,
        source: String(record.source ?? 'Indlæst'),
      } satisfies Factor;
    })
    .filter((item): item is Factor => Boolean(item));

  return normalized.length > 0 ? normalized : FACTORS;
}

function migrateState(raw: Partial<DataState> | null | undefined): DataState {
  const defaults = cloneInitial();
  const factors = normalizeFactorList(raw?.factors);
  return {
    factors,
    el: (raw?.el ?? defaults.el).map((post) => normalizeElPost(post, factors)),
    vand: (raw?.vand ?? defaults.vand).map((post) => normalizeVandPost(post, factors)),
    braendstof: (raw?.braendstof ?? defaults.braendstof).map((post) => normalizeBraendstofPost(post, factors)),
    materialer: (raw?.materialer ?? defaults.materialer).map((post) => normalizeMaterialePost(post, factors)),
    affald: (raw?.affald ?? defaults.affald).map((post) => normalizeAffaldPost(post, factors)),
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
    const factor = getFactor(state.factors, input.factorKey);
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
    const factor = getFactor(state.factors, input.factorKey);
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
    const factor = getFactor(state.factors, input.factorKey);
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
    const factor = getFactor(state.factors, input.factorKey);
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
    const factor = getFactor(state.factors, input.factorKey);
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

  const replaceFactors = (factors: Factor[]) => {
    setState((prev) => {
      const deduped = new Map(factors.map((factor) => [factor.key, factor]));
      const list = Array.from(deduped.values());

      const updateWithFactor = (factorKey: string, fallbackName: string | undefined, amount: number) => {
        const factor = getFactor(list, factorKey) ?? (fallbackName ? getFactor(list, fallbackName) : undefined);
        if (!factor) return undefined;
        return {
          factorKey: factor.key,
          factorName: factor.name,
          enhed: factor.unit,
          co2FaktorKgPerEnhed: factor.factorKgCo2PerUnit,
          beregnetCo2Kg: Number((amount * factor.factorKgCo2PerUnit).toFixed(3)),
        };
      };

      return {
        ...prev,
        factors: list,
        el: prev.el.map((item) => {
          const updated = updateWithFactor(item.factorKey, item.factorName, item.maengde);
          return updated
            ? { ...item, ...updated }
            : item;
        }),
        vand: prev.vand.map((item) => {
          const updated = updateWithFactor(item.factorKey, item.factorName, item.maengde);
          return updated
            ? { ...item, ...updated }
            : item;
        }),
        braendstof: prev.braendstof.map((item) => {
          const updated = updateWithFactor(item.factorKey, item.factorName, item.maengde);
          return updated
            ? { ...item, ...updated }
            : item;
        }),
        materialer: prev.materialer.map((item) => {
          const factor = getFactor(list, item.factorKey) ?? getFactor(list, item.materiale);
          if (!factor) return item;
          return {
            ...item,
            factorKey: factor.key,
            materiale: factor.name,
            enhed: factor.unit,
            co2FaktorKgPerEnhed: factor.factorKgCo2PerUnit,
            beregnetCo2Kg: Number((item.maengde * factor.factorKgCo2PerUnit).toFixed(3)),
          };
        }),
        affald: prev.affald.map((item) => {
          const factor = getFactor(list, item.factorKey) ?? getFactor(list, item.fraktion);
          if (!factor) return item;
          return {
            ...item,
            factorKey: factor.key,
            fraktion: factor.name,
            enhed: factor.unit,
            co2FaktorKgPerEnhed: factor.factorKgCo2PerUnit,
            beregnetCo2Kg: Number((item.maengde * factor.factorKgCo2PerUnit).toFixed(3)),
          };
        }),
      };
    });
  };

  const value: DataContextValue = useMemo(
    () => ({
      ...state,
      addEl,
      addVand,
      addBraendstof,
      addMateriale,
      addAffald,
      deleteRecord,
      updateBygning,
      getFactorByKey: (key: string) => getFactor(state.factors, key),
      replaceFactors,
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
