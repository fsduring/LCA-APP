import { useMemo } from 'react';
import { useData } from '../data/DataProvider';

export default function OversigtPage() {
  const { materialer, el, vand, braendstof, affald, bygning } = useData();

  const totals = useMemo(() => {
    const sum = (values: number[]) => values.reduce((acc, value) => acc + value, 0);
    const a1a3 = sum(materialer.map((item) => item.beregnetCo2Kg));
    const energi = sum(el.map((item) => item.beregnetCo2Kg));
    const water = sum(vand.map((item) => item.beregnetCo2Kg));
    const fuel = sum(braendstof.map((item) => item.beregnetCo2Kg));
    const waste = sum(affald.map((item) => item.beregnetCo2Kg));
    const a4a5 = energi + water + fuel + waste;
    const total = a1a3 + a4a5;
    const areal = bygning.bygningArealM2;
    const safeDivide = (value: number) => (areal > 0 ? value / areal : 0);
    return {
      a1a3,
      a4a5,
      total,
      a1a3PrM2: safeDivide(a1a3),
      a4a5PrM2: safeDivide(a4a5),
      totalPrM2: safeDivide(total),
      categories: {
        Materialer: a1a3,
        El: energi,
        Vand: water,
        Brændstof: fuel,
        Affald: waste,
      },
    };
  }, [affald, braendstof, bygning.bygningArealM2, el, materialer, vand]);

  const maxCategory = Math.max(...Object.values(totals.categories), 1);

  return (
    <div>
      <section className="card">
        <h2 className="section-title">A1–A5 totaler</h2>
        <div className="data-list">
          <div className="data-card">
            <h3>A1–A3 total</h3>
            <p>{totals.a1a3.toFixed(1)} kg CO₂e</p>
          </div>
          <div className="data-card">
            <h3>A4–A5 total</h3>
            <p>{totals.a4a5.toFixed(1)} kg CO₂e</p>
          </div>
          <div className="data-card">
            <h3>A1–A5 total</h3>
            <p>{totals.total.toFixed(1)} kg CO₂e</p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">CO₂ pr. m²</h2>
        <div className="data-list">
          <div className="data-card">
            <h3>A1–A3 pr. m²</h3>
            <p>{totals.a1a3PrM2.toFixed(2)} kg CO₂e/m²</p>
          </div>
          <div className="data-card">
            <h3>A4–A5 pr. m²</h3>
            <p>{totals.a4a5PrM2.toFixed(2)} kg CO₂e/m²</p>
          </div>
          <div className="data-card">
            <h3>A1–A5 pr. m²</h3>
            <p>{totals.totalPrM2.toFixed(2)} kg CO₂e/m²</p>
          </div>
        </div>
        {bygning.bygningArealM2 === 0 && (
          <p className="error-text">Angiv bygningens areal på Bygnings-siden for korrekte værdier.</p>
        )}
      </section>

      <section className="card chart-wrapper">
        <h2 className="section-title">Fordeling pr. kategori</h2>
        <div className="bar-chart">
          {Object.entries(totals.categories).map(([label, value]) => (
            <div key={label} className="bar-row">
              <span className="bar-label">{label}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${Math.max((value / maxCategory) * 100, 6)}%` }}
                />
              </div>
              <span style={{ minWidth: '64px', textAlign: 'right', fontSize: '0.85rem' }}>
                {value.toFixed(1)} kg
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
