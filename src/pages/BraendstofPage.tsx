import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useData } from '../data/DataProvider';
import { getFactorsForCategory } from '../data/options';

const today = new Date().toISOString().slice(0, 10);

type BraendstofFormState = {
  dato: string;
  factorKey: string;
  maengde: string;
  kilde: string;
  kommentar: string;
};

export default function BraendstofPage() {
  const { factors, braendstof, addBraendstof, getFactorByKey, deleteRecord } = useData();
  const availableFactors = useMemo(() => getFactorsForCategory(factors, 'braendstof'), [factors]);
  const [form, setForm] = useState<BraendstofFormState>({
    dato: today,
    factorKey: '',
    maengde: '',
    kilde: '',
    kommentar: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!form.factorKey && availableFactors.length > 0) {
      setForm((prev) => ({ ...prev, factorKey: availableFactors[0].key }));
    }
  }, [availableFactors, form.factorKey]);

  const faktor = form.factorKey ? getFactorByKey(form.factorKey) : undefined;
  const beregnetCo2 = faktor && form.maengde ? Number(form.maengde) * faktor.factorKgCo2PerUnit : 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const maengdeNumber = Number(form.maengde);
    if (!form.dato || !form.factorKey || Number.isNaN(maengdeNumber) || maengdeNumber <= 0) {
      setError('Udfyld dato, type og en positiv mængde.');
      return;
    }
    const factor = getFactorByKey(form.factorKey);
    if (!factor) {
      setError('Den valgte faktor findes ikke.');
      return;
    }
    setError('');
    addBraendstof({
      dato: form.dato,
      factorKey: form.factorKey,
      maengde: maengdeNumber,
      kilde: form.kilde,
      kommentar: form.kommentar || undefined,
    });
    setForm((prev) => ({
      ...prev,
      dato: today,
      maengde: '',
      kilde: '',
      kommentar: '',
    }));
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Er du sikker på, at du vil slette denne registrering?')) return;
    deleteRecord('braendstof', id);
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
              value={form.factorKey}
              onChange={(event) => setForm((prev) => ({ ...prev, factorKey: event.target.value }))}
              required
            >
              <option value="">Vælg type</option>
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
            Kilde
            <input
              type="text"
              value={form.kilde}
              onChange={(event) => setForm((prev) => ({ ...prev, kilde: event.target.value }))}
            />
          </label>
          <label className="full">
            Kommentar
            <textarea
              value={form.kommentar}
              onChange={(event) => setForm((prev) => ({ ...prev, kommentar: event.target.value }))}
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
          {error && <span className="error-text span2">{error}</span>}
          <button type="submit" className="primary span2">
            Gem forbrug
          </button>
        </form>
      </section>

      <section className="card">
        <h2 className="section-title">Registreringer</h2>
        <div className="data-list">
          {braendstof.map((post) => (
            <article key={post.id} className="data-card">
              <h3>{post.dato}</h3>
              <p>Type: {post.factorName}</p>
              <p>
                Mængde: {post.maengde} {post.enhed}
              </p>
              <p>CO₂: {post.beregnetCo2Kg.toFixed(2)} kg</p>
              {post.kilde && <p>Kilde: {post.kilde}</p>}
              {post.kommentar && <p>Note: {post.kommentar}</p>}
              <button type="button" className="danger" onClick={() => handleDelete(post.id)}>
                Slet
              </button>
            </article>
          ))}
          {braendstof.length === 0 && <p>Ingen registreringer endnu.</p>}
        </div>
      </section>
    </div>
  );
}
