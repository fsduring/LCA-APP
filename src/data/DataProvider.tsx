import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { initialData } from './initialData';
import { FAKTORER } from './factors';
import {
  AffaldPost,
  BraendstofPost,
  BygningInfo,
  DataState,
  ElPost,
  MaterialePost,
  VandPost,
} from './types';

const STORAGE_KEY = 'lca-app-data';

type AddBase = {
  dato: string;
  type: string;
  maengde: number;
  kilde: string;
  kommentar?: string;
};

type AddMateriale = {
  dato: string;
  materiale: string;
  maengde: number;
  produktNote?: string;
  leverandoer?: string;
  transportmetodeAbc?: 'a' | 'b' | 'c';
  transportdistanceKm?: number;
};

type AddAffald = {
  dato: string;
  fraktion: string;
  maengde: number;
  modtager?: string;
  genanvendelseProcent?: number;
  kommentar?: string;
  erSpild: boolean;
};

type DataContextValue = DataState & {
  addEl: (input: AddBase) => void;
  addVand: (input: AddBase) => void;
  addBraendstof: (input: AddBase) => void;
  addMateriale: (input: AddMateriale) => void;
  addAffald: (input: AddAffald) => void;
  deleteElectricityEntry: (id: string) => void;
  deleteWaterEntry: (id: string) => void;
  deleteFuelEntry: (id: string) => void;
  deleteMaterialEntry: (id: string) => void;
  deleteWasteEntry: (id: string) => void;
  updateBygning: (info: BygningInfo) => void;
  getFaktor: (type: string) => {
    enhed: string;
    co2FaktorKgPerEnhed: number;
  } | null;
};

const DataContext = createContext<DataContextValue | undefined>(undefined);

function generateId(prefix: string) {
  const cryptoApi = (globalThis as { crypto?: Crypto }).crypto;
  const randomSegment =
    cryptoApi && typeof cryptoApi.randomUUID === 'function'
      ? cryptoApi.randomUUID()
      : Math.random().toString(36).slice(2, 11);
  return `${prefix}-${randomSegment}`;
}

function cloneInitial(): DataState {
  const clone = (globalThis as { structuredClone?: <T>(value: T) => T }).structuredClone;
  if (typeof clone === 'function') {
    return clone(initialData);
  }
  return JSON.parse(JSON.stringify(initialData)) as DataState;
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
    const parsed = JSON.parse(stored) as DataState & { faktorer?: unknown };
    if (!parsed) {
      return cloneInitial();
    }
    const { faktorer: _legacyFaktorer, ...rest } = parsed;
    return { ...cloneInitial(), ...rest };
  } catch (error) {
    console.warn('Kunne ikke indlæse data fra localStorage', error);
    return cloneInitial();
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DataState>(() => loadState());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const getFaktor = useCallback((type: string) => {
    const faktor = FAKTORER.find((f) => f.type === type);
    if (!faktor) return null;
    return {
      enhed: faktor.enhed,
      co2FaktorKgPerEnhed: faktor.faktorKgCo2PerEnhed,
    };
  }, []);

  const addEl = useCallback((input: AddBase) => {
    const faktor = getFaktor(input.type);
    if (!faktor) return;
    const post: ElPost = {
      id: generateId('el'),
      dato: input.dato,
      type: input.type,
      enhed: faktor.enhed,
      maengde: input.maengde,
      kilde: input.kilde,
      kommentar: input.kommentar,
      co2FaktorKgPerEnhed: faktor.co2FaktorKgPerEnhed,
      beregnetCo2Kg: Number((input.maengde * faktor.co2FaktorKgPerEnhed).toFixed(3)),
    };
    setState((prev) => ({ ...prev, el: [post, ...prev.el] }));
  }, [getFaktor]);

  const addVand = useCallback((input: AddBase) => {
    const faktor = getFaktor(input.type);
    if (!faktor) return;
    const post: VandPost = {
      id: generateId('vand'),
      dato: input.dato,
      type: input.type,
      enhed: faktor.enhed,
      maengde: input.maengde,
      kilde: input.kilde,
      kommentar: input.kommentar,
      co2FaktorKgPerEnhed: faktor.co2FaktorKgPerEnhed,
      beregnetCo2Kg: Number((input.maengde * faktor.co2FaktorKgPerEnhed).toFixed(3)),
    };
    setState((prev) => ({ ...prev, vand: [post, ...prev.vand] }));
  }, [getFaktor]);

  const addBraendstof = useCallback((input: AddBase) => {
    const faktor = getFaktor(input.type);
    if (!faktor) return;
    const post: BraendstofPost = {
      id: generateId('braendstof'),
      dato: input.dato,
      type: input.type,
      enhed: faktor.enhed,
      maengde: input.maengde,
      kilde: input.kilde,
      kommentar: input.kommentar,
      co2FaktorKgPerEnhed: faktor.co2FaktorKgPerEnhed,
      beregnetCo2Kg: Number((input.maengde * faktor.co2FaktorKgPerEnhed).toFixed(3)),
    };
    setState((prev) => ({ ...prev, braendstof: [post, ...prev.braendstof] }));
  }, [getFaktor]);

  const addMateriale = useCallback((input: AddMateriale) => {
    const faktor = getFaktor(input.materiale);
    if (!faktor) return;
    const post: MaterialePost = {
      id: generateId('materiale'),
      dato: input.dato,
      materiale: input.materiale,
      produktNote: input.produktNote,
      enhed: faktor.enhed,
      maengde: input.maengde,
      leverandoer: input.leverandoer,
      transportmetodeAbc: input.transportmetodeAbc,
      transportdistanceKm: input.transportdistanceKm,
      co2FaktorKgPerEnhed: faktor.co2FaktorKgPerEnhed,
      beregnetCo2Kg: Number((input.maengde * faktor.co2FaktorKgPerEnhed).toFixed(3)),
    };
    setState((prev) => ({ ...prev, materialer: [post, ...prev.materialer] }));
  }, [getFaktor]);

  const addAffald = useCallback((input: AddAffald) => {
    const faktor = getFaktor(input.fraktion);
    if (!faktor) return;
    const post: AffaldPost = {
      id: generateId('affald'),
      dato: input.dato,
      fraktion: input.fraktion,
      enhed: faktor.enhed,
      maengde: input.maengde,
      modtager: input.modtager,
      genanvendelseProcent: input.genanvendelseProcent,
      kommentar: input.kommentar,
      co2FaktorKgPerEnhed: faktor.co2FaktorKgPerEnhed,
      beregnetCo2Kg: Number((input.maengde * faktor.co2FaktorKgPerEnhed).toFixed(3)),
      erSpild: input.erSpild,
    };
    setState((prev) => ({ ...prev, affald: [post, ...prev.affald] }));
  }, [getFaktor]);

  const deleteElectricityEntry = useCallback((id: string) => {
    setState((prev) => ({ ...prev, el: prev.el.filter((item) => item.id !== id) }));
  }, []);

  const deleteWaterEntry = useCallback((id: string) => {
    setState((prev) => ({ ...prev, vand: prev.vand.filter((item) => item.id !== id) }));
  }, []);

  const deleteFuelEntry = useCallback((id: string) => {
    setState((prev) => ({ ...prev, braendstof: prev.braendstof.filter((item) => item.id !== id) }));
  }, []);

  const deleteMaterialEntry = useCallback((id: string) => {
    setState((prev) => ({ ...prev, materialer: prev.materialer.filter((item) => item.id !== id) }));
  }, []);

  const deleteWasteEntry = useCallback((id: string) => {
    setState((prev) => ({ ...prev, affald: prev.affald.filter((item) => item.id !== id) }));
  }, []);

  const updateBygning = useCallback((info: BygningInfo) => {
    setState((prev) => ({ ...prev, bygning: info }));
  }, []);

  const value: DataContextValue = useMemo(
    () => ({
      ...state,
      addEl,
      addVand,
      addBraendstof,
      addMateriale,
      addAffald,
      deleteElectricityEntry,
      deleteWaterEntry,
      deleteFuelEntry,
      deleteMaterialEntry,
      deleteWasteEntry,
      updateBygning,
      getFaktor,
    }),
    [
      state,
      addAffald,
      addBraendstof,
      addEl,
      addMateriale,
      addVand,
      deleteElectricityEntry,
      deleteFuelEntry,
      deleteMaterialEntry,
      deleteWasteEntry,
      deleteWaterEntry,
      getFaktor,
      updateBygning,
    ]
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
