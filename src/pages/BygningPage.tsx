import { FormEvent, useState } from 'react';
import { useData } from '../data/DataProvider';

export default function BygningPage() {
  const { bygning, updateBygning } = useData();
  const [projektNavn, setProjektNavn] = useState(bygning.projektNavn);
  const [areal, setAreal] = useState(String(bygning.bygningArealM2));
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = Number(areal);
    if (Number.isNaN(parsed) || parsed <= 0) {
      setError('Areal skal være et positivt tal.');
      setMessage('');
      return;
    }
    setError('');
    updateBygning({
      projektNavn: projektNavn || 'Projekt',
      bygningArealM2: parsed,
    });
    setMessage('Bygningsdata gemt.');
  };

  return (
    <div>
      <section className="card">
        <h2 className="section-title">Projektdata</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="full">
            Projekt navn
            <input
              type="text"
              value={projektNavn}
              onChange={(event) => setProjektNavn(event.target.value)}
            />
          </label>
          <label>
            Bruttoareal (m²)
            <input
              type="number"
              min="0"
              step="1"
              value={areal}
              onChange={(event) => setAreal(event.target.value)}
              required
            />
          </label>
          {error && <span className="error-text">{error}</span>}
          {message && <span style={{ color: '#059669', fontSize: '0.9rem' }}>{message}</span>}
          <button type="submit" className="primary">
            Gem projektdata
          </button>
        </form>
      </section>

      <section className="card">
        <h2 className="section-title">Aktuelle værdier</h2>
        <p>Projekt: {bygning.projektNavn}</p>
        <p>Areal: {bygning.bygningArealM2} m²</p>
      </section>
    </div>
  );
}
