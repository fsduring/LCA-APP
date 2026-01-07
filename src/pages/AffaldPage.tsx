import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useData } from '../data/DataProvider';
import { getFactorsForCategory } from '../data/options';

const today = new Date().toISOString().slice(0, 10);

type AffaldFormState = {
  dato: string;
  factorKey: string;
  maengde: string;
  modtager: string;
  genanvendelseProcent: string;
  kommentar: string;
  erSpild: boolean;
};

export default function AffaldPage() {
  const { factors, affald, addAffald, getFactorByKey, deleteRecord } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const availableFactors = useMemo(
    () => getFactorsForCategory(factors, 'affald', searchTerm),
    [factors, searchTerm]
  );
  const [form, setForm] = useState<AffaldFormState>({
    dato: today,
    factorKey: '',
    maengde: '',
    modtager: '',
    genanvendelseProcent: '',
    kommentar: '',
    erSpild: false,
  });
  const [error, setError] = useState('');

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
      setError('Udfyld dato, fraktion og en positiv mængde.');
      return;
    }
    const genanvendelse = form.genanvendelseProcent ? Number(form.genanvendelseProcent) : undefined;
    if (genanvendelse !== undefined && (genanvendelse < 0 || genanvendelse > 100)) {
      setError('Genanvendelse skal være mellem 0 og 100 %.');
      return;
    }
    const factor = getFactorByKey(form.factorKey);
    if (!factor) {
      setError('Den valgte faktor findes ikke.');
      return;
    }
    setError('');
    addAffald({
      dato: form.dato,
      factorKey: form.factorKey,
      maengde: maengdeNumber,
      modtager: form.modtager || undefined,
      genanvendelseProcent: genanvendelse,
      kommentar: form.kommentar || undefined,
      erSpild: form.erSpild,
    });
    setForm((prev) => ({
      ...prev,
      dato: today,
      maengde: '',
      modtager: '',
      genanvendelseProcent: '',
      kommentar: '',
      erSpild: false,
    }));
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Er du sikker på, at du vil slette denne registrering?')) return;
    deleteRecord('affald', id);
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
          <label className="full">
            Søg fraktion
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Søg efter affaldstype"
            />
          </label>
          <label>
            Fraktion
            <select
              value={form.factorKey}
              onChange={(event) => setForm((prev) => ({ ...prev, factorKey: event.target.value }))}
              required
            >
              <option value="">Vælg fraktion</option>
              {availableFactors.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Mængde
            <div className="input-with-unit">
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.maengde}
                onChange={(event) => setForm((prev) => ({ ...prev, maengde: event.target.value }))}
                required
              />
              <span className="unit-label">{faktor?.unit ?? ''}</span>
            </div>
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
          <label className="full" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={form.erSpild}
              onChange={(event) => setForm((prev) => ({ ...prev, erSpild: event.target.checked }))}
            />
            Er spild?
          </label>
          <label>
            CO₂-faktor
            <div className="input-with-unit">
              <input type="text" value={faktor?.factorKgCo2PerUnit ?? ''} readOnly />
              <span className="unit-label">{faktor ? `kg CO₂e/${faktor.unit}` : ''}</span>
            </div>
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
              <p>
                Mængde: {post.maengde} {post.enhed}
              </p>
              <p>CO₂: {post.beregnetCo2Kg.toFixed(2)} kg</p>
              {post.modtager && <p>Modtager: {post.modtager}</p>}
              {typeof post.genanvendelseProcent === 'number' && <p>Genanvendelse: {post.genanvendelseProcent}%</p>}
              {post.kommentar && <p>Note: {post.kommentar}</p>}
              <p>Spild: {post.erSpild ? 'Ja' : 'Nej'}</p>
              <button type="button" className="danger" onClick={() => handleDelete(post.id)}>
                Slet
              </button>
            </article>
          ))}
          {affald.length === 0 && <p>Ingen registreringer endnu.</p>}
        </div>
      </section>
    </div>
  );
}
