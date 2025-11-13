import { FormEvent, useMemo, useState } from 'react';
import { useData } from '../data/DataProvider';
import { BRAENDSTOF_TYPES } from '../data/options';

const today = new Date().toISOString().slice(0, 10);

type BraendstofFormState = {
  dato: string;
  type: string;
  maengde: string;
  kilde: string;
  kommentar: string;
};

export default function BraendstofPage() {
  const { faktorer, braendstof, addBraendstof, getFaktor } = useData();
  const [form, setForm] = useState<BraendstofFormState>({
    dato: today,
    type: BRAENDSTOF_TYPES[0] ?? '',
    maengde: '',
    kilde: '',
    kommentar: '',
  });
  const [error, setError] = useState('');

  const availableTypes = useMemo(
    () => faktorer.filter((f) => BRAENDSTOF_TYPES.includes(f.type)),
    [faktorer]
  );

  const faktor = form.type ? getFaktor(form.type) : null;
  const beregnetCo2 = faktor && form.maengde ? Number(form.maengde) * faktor.co2FaktorKgPerEnhed : 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const maengdeNumber = Number(form.maengde);
    if (!form.dato || !form.type || Number.isNaN(maengdeNumber) || maengdeNumber <= 0) {
      setError('Udfyld dato, type og en positiv mængde.');
      return;
    }
    setError('');
    addBraendstof({
      dato: form.dato,
      type: form.type,
      maengde: maengdeNumber,
      kilde: form.kilde,
      kommentar: form.kommentar || undefined,
    });
    setForm({
      dato: today,
      type: form.type,
      maengde: '',
      kilde: '',
      kommentar: '',
    });
  };

  return (
    <div>
      <section className="card">
        <h2 className="section-title">Registrér brændstofforbrug</h2>
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
            Type
            <select
              value={form.type}
              onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
              required
            >
              <option value="">Vælg type</option>
              {availableTypes.map((item) => (
                <option key={item.type} value={item.type}>
                  {item.type}
                </option>
              ))}
            </select>
          </label>
          <label>
            Mængde ({faktor?.enhed ?? 'enhed'})
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
            Kilde
            <input
              type="text"
              value={form.kilde}
              onChange={(event) => setForm((prev) => ({ ...prev, kilde: event.target.value }))}
            />
          </label>
          <label className="full">
            Kommentar (maskine, note m.m.)
            <textarea
              value={form.kommentar}
              onChange={(event) => setForm((prev) => ({ ...prev, kommentar: event.target.value }))}
            />
          </label>
          <label>
            CO₂-faktor (kg CO₂e/{faktor?.enhed ?? '-'})
            <input type="text" value={faktor?.co2FaktorKgPerEnhed ?? ''} readOnly />
          </label>
          <label>
            Beregnet CO₂ (kg CO₂e)
            <input type="text" value={beregnetCo2 ? beregnetCo2.toFixed(2) : ''} readOnly />
          </label>
          {error && <span className="error-text">{error}</span>}
          <button type="submit" className="primary">
            Gem brændstof
          </button>
        </form>
      </section>

      <section className="card">
        <h2 className="section-title">Registreringer</h2>
        <div className="data-list">
          {braendstof.map((post) => (
            <article key={post.id} className="data-card">
              <h3>{post.dato}</h3>
              <p>Type: {post.type}</p>
              <p>Mængde: {post.maengde} {post.enhed}</p>
              <p>CO₂: {post.beregnetCo2Kg.toFixed(2)} kg</p>
              {post.kilde && <p>Kilde: {post.kilde}</p>}
              {post.kommentar && <p>Note: {post.kommentar}</p>}
            </article>
          ))}
          {braendstof.length === 0 && <p>Ingen registreringer endnu.</p>}
        </div>
      </section>
    </div>
  );
}
