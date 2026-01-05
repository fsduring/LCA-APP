import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useData } from '../data/DataProvider';

const navCards = [
  { to: '/el', label: 'El' },
  { to: '/vand', label: 'Vand' },
  { to: '/braendstof', label: 'Brændstof' },
  { to: '/materialer', label: 'Materialer' },
  { to: '/affald', label: 'Affald' },
  { to: '/bygning', label: 'Bygning' },
  { to: '/oversigt', label: 'Oversigt' },
  { to: '/faktorer', label: 'Faktorer / Standard' },
];

export default function HomePage() {
  const { el, vand, braendstof, materialer, affald } = useData();

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

  return (
    <div>
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
