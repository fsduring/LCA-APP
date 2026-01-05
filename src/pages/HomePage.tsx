import { Link } from 'react-router-dom';
import { ChangeEvent, useMemo, useState } from 'react';
import { useData } from '../data/DataProvider';
import { parseFactorsFromWorkbook } from '../data/excel';

const navCards = [
  { to: '/el', label: 'El' },
  { to: '/vand', label: 'Vand' },
  { to: '/braendstof', label: 'Brændstof' },
  { to: '/materialer', label: 'Materialer' },
  { to: '/affald', label: 'Affald' },
  { to: '/bygning', label: 'Bygning' },
  { to: '/oversigt', label: 'Oversigt' },
];

export default function HomePage() {
  const { el, vand, braendstof, materialer, affald, replaceFactors } = useData();
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState('');

  const totals = useMemo(() => {
    const sum = (values: number[]) => values.reduce((acc, value) => acc + value, 0);
    const elTotal = sum(el.map((post) => post.beregnetCo2Kg));
    const vandTotal = sum(vand.map((post) => post.beregnetCo2Kg));
    const braendstofTotal = sum(braendstof.map((post) => post.beregnetCo2Kg));
    const materialerTotal = sum(materialer.map((post) => post.beregnetCo2Kg));
    const affaldTotal = sum(affald.map((post) => post.beregnetCo2Kg));
    const samlet = elTotal + vandTotal + braendstofTotal + materialerTotal + affaldTotal;
    return {
      elTotal,
      vandTotal,
      braendstofTotal,
      materialerTotal,
      affaldTotal,
      samlet,
    };
  }, [affald, braendstof, el, materialer, vand]);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setUploadError('');
      const buffer = await file.arrayBuffer();
      const factors = parseFactorsFromWorkbook(buffer);
      replaceFactors(factors);
      setUploadMessage(`Indlæste ${factors.length} faktorer fra ${file.name}.`);
    } catch (error) {
      setUploadMessage('');
      const message = error instanceof Error ? error.message : 'Kunne ikke læse Excel-arket.';
      setUploadError(message);
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div>
      <section className="card">
        <h2 className="section-title">Upload emissionsfaktorer</h2>
        <form className="form-grid">
          <label className="full">
            Excel-ark (fx BR2025 Tabel 7)
            <input type="file" accept=".xlsx,.xls" onChange={handleUpload} />
          </label>
          {uploadError && <span className="error-text">{uploadError}</span>}
          {uploadMessage && <span style={{ color: '#059669', fontSize: '0.9rem' }}>{uploadMessage}</span>}
        </form>
      </section>

      <section className="card">
        <h2 className="section-title">Overblik</h2>
        <div className="summary-grid">
          <div className="summary-card">
            <h3>Total CO₂</h3>
            <p>{totals.samlet.toFixed(1)} kg</p>
          </div>
        </div>
        <div className="data-list" style={{ marginTop: '16px' }}>
          <div className="data-card">
            <h3>El</h3>
            <p>{totals.elTotal.toFixed(1)} kg CO₂e</p>
          </div>
          <div className="data-card">
            <h3>Vand</h3>
            <p>{totals.vandTotal.toFixed(1)} kg CO₂e</p>
          </div>
          <div className="data-card">
            <h3>Brændstof</h3>
            <p>{totals.braendstofTotal.toFixed(1)} kg CO₂e</p>
          </div>
          <div className="data-card">
            <h3>Materialer (A1–A3)</h3>
            <p>{totals.materialerTotal.toFixed(1)} kg CO₂e</p>
          </div>
          <div className="data-card">
            <h3>Affald</h3>
            <p>{totals.affaldTotal.toFixed(1)} kg CO₂e</p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">Gå til registrering</h2>
        <div className="data-list">
          {navCards.map((card) => (
            <Link key={card.to} to={card.to} className="data-card">
              <h3>{card.label}</h3>
              <p>Åbn {card.label}-siden</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
