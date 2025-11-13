import { FormEvent, useMemo, useState } from 'react';
import { useData } from '../data/DataProvider';
import { MATERIALE_TYPES } from '../data/options';

const today = new Date().toISOString().slice(0, 10);

type MaterialeFormState = {
  dato: string;
  materiale: string;
  maengde: string;
  produktNote: string;
  leverandoer: string;
  transportmetodeAbc: '' | 'a' | 'b' | 'c';
  transportdistanceKm: string;
};

export default function MaterialerPage() {
  const { faktorer, materialer, addMateriale, getFaktor } = useData();
  const [form, setForm] = useState<MaterialeFormState>({
    dato: today,
    materiale: MATERIALE_TYPES[0] ?? '',
    maengde: '',
    produktNote: '',
    leverandoer: '',
    transportmetodeAbc: '',
    transportdistanceKm: '',
  });
  const [error, setError] = useState('');

  const availableTypes = useMemo(
    () => faktorer.filter((f) => MATERIALE_TYPES.includes(f.name)),
    [faktorer]
  );

  const faktor = form.materiale ? getFaktor(form.materiale) : null;
  const beregnetCo2 = faktor && form.maengde ? Number(form.maengde) * faktor.co2FaktorKgPerEnhed : 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const maengdeNumber = Number(form.maengde);
    if (!form.dato || !form.materiale || Number.isNaN(maengdeNumber) || maengdeNumber <= 0) {
      setError('Udfyld dato, materiale og en positiv mængde.');
      return;
    }
    setError('');
    addMateriale({
      dato: form.dato,
      materiale: form.materiale,
      maengde: maengdeNumber,
      produktNote: form.produktNote || undefined,
      leverandoer: form.leverandoer || undefined,
      transportmetodeAbc: form.transportmetodeAbc || undefined,
      transportdistanceKm: form.transportdistanceKm
        ? Number(form.transportdistanceKm)
        : undefined,
    });
    setForm({
      dato: today,
      materiale: form.materiale,
      maengde: '',
      produktNote: '',
      leverandoer: '',
      transportmetodeAbc: '',
      transportdistanceKm: '',
    });
  };

  return (
    <div>
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
          <label>
            Materiale
            <select
              value={form.materiale}
              onChange={(event) => setForm((prev) => ({ ...prev, materiale: event.target.value }))}
              required
            >
              <option value="">Vælg materiale</option>
              {availableTypes.map((item) => (
                <option key={item.key} value={item.name}>
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
                setForm((prev) => ({ ...prev, transportmetodeAbc: event.target.value as 'a' | 'b' | 'c' | '' }))
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
            <input type="text" value={faktor?.co2FaktorKgPerEnhed ?? ''} readOnly />
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
              <p>Mængde: {post.maengde} {post.enhed}</p>
              <p>CO₂: {post.beregnetCo2Kg.toFixed(2)} kg</p>
              {post.produktNote && <p>Note: {post.produktNote}</p>}
              {post.leverandoer && <p>Leverandør: {post.leverandoer}</p>}
              {post.transportmetodeAbc && (
                <p>Transportmetode: {post.transportmetodeAbc.toUpperCase()}</p>
              )}
              {typeof post.transportdistanceKm === 'number' && (
                <p>Transportdistance: {post.transportdistanceKm} km</p>
              )}
            </article>
          ))}
          {materialer.length === 0 && <p>Ingen registreringer endnu.</p>}
        </div>
      </section>
    </div>
  );
}
