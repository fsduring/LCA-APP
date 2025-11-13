import { FormEvent, useMemo, useState } from 'react';
import { useData } from '../data/DataProvider';
import { AFFALD_TYPES } from '../data/options';

const today = new Date().toISOString().slice(0, 10);

type AffaldFormState = {
  dato: string;
  fraktion: string;
  maengde: string;
  modtager: string;
  genanvendelseProcent: string;
  kommentar: string;
  erSpild: boolean;
};

export default function AffaldPage() {
  const { faktorer, affald, addAffald, getFaktor } = useData();
  const [form, setForm] = useState<AffaldFormState>({
    dato: today,
    fraktion: AFFALD_TYPES[0] ?? '',
    maengde: '',
    modtager: '',
    genanvendelseProcent: '',
    kommentar: '',
    erSpild: false,
  });
  const [error, setError] = useState('');

  const availableTypes = useMemo(
    () => faktorer.filter((f) => AFFALD_TYPES.includes(f.type)),
    [faktorer]
  );

  const faktor = form.fraktion ? getFaktor(form.fraktion) : null;
  const beregnetCo2 = faktor && form.maengde ? Number(form.maengde) * faktor.co2FaktorKgPerEnhed : 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const maengdeNumber = Number(form.maengde);
    if (!form.dato || !form.fraktion || Number.isNaN(maengdeNumber) || maengdeNumber <= 0) {
      setError('Udfyld dato, fraktion og en positiv mængde.');
      return;
    }
    const genanvendelse = form.genanvendelseProcent ? Number(form.genanvendelseProcent) : undefined;
    if (genanvendelse !== undefined && (genanvendelse < 0 || genanvendelse > 100)) {
      setError('Genanvendelse skal være mellem 0 og 100 %.');
      return;
    }
    setError('');
    addAffald({
      dato: form.dato,
      fraktion: form.fraktion,
      maengde: maengdeNumber,
      modtager: form.modtager || undefined,
      genanvendelseProcent: genanvendelse,
      kommentar: form.kommentar || undefined,
      erSpild: form.erSpild,
    });
    setForm({
      dato: today,
      fraktion: form.fraktion,
      maengde: '',
      modtager: '',
      genanvendelseProcent: '',
      kommentar: '',
      erSpild: false,
    });
  };

  return (
    <div>
      <section className="card">
        <h2 className="section-title">Registrér affald</h2>
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
            Fraktion
            <select
              value={form.fraktion}
              onChange={(event) => setForm((prev) => ({ ...prev, fraktion: event.target.value }))}
              required
            >
              <option value="">Vælg fraktion</option>
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
            Modtager
            <input
              type="text"
              value={form.modtager}
              onChange={(event) => setForm((prev) => ({ ...prev, modtager: event.target.value }))}
            />
          </label>
          <label>
            Genanvendelse (%)
            <input
              type="number"
              min="0"
              max="100"
              value={form.genanvendelseProcent}
              onChange={(event) => setForm((prev) => ({ ...prev, genanvendelseProcent: event.target.value }))}
            />
          </label>
          <label className="full">
            Kommentar
            <textarea
              value={form.kommentar}
              onChange={(event) => setForm((prev) => ({ ...prev, kommentar: event.target.value }))}
            />
          </label>
          <label className="full">
            <input
              type="checkbox"
              checked={form.erSpild}
              onChange={(event) => setForm((prev) => ({ ...prev, erSpild: event.target.checked }))}
            />{' '}
            Er spild?
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
            Gem affald
          </button>
        </form>
      </section>

      <section className="card">
        <h2 className="section-title">Registreringer</h2>
        <div className="data-list">
          {affald.map((post) => (
            <article key={post.id} className="data-card">
              <h3>{post.dato}</h3>
              <p>Fraktion: {post.fraktion}</p>
              <p>Mængde: {post.maengde} {post.enhed}</p>
              <p>CO₂: {post.beregnetCo2Kg.toFixed(2)} kg</p>
              {post.modtager && <p>Modtager: {post.modtager}</p>}
              {typeof post.genanvendelseProcent === 'number' && (
                <p>Genanvendelse: {post.genanvendelseProcent}%</p>
              )}
              {post.kommentar && <p>Note: {post.kommentar}</p>}
              <p>Spild: {post.erSpild ? 'Ja' : 'Nej'}</p>
            </article>
          ))}
          {affald.length === 0 && <p>Ingen registreringer endnu.</p>}
        </div>
      </section>
    </div>
  );
}
