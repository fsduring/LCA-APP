import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { useData } from '../data/DataProvider';
import { Factor } from '../data/factors';

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
  const { el, vand, braendstof, materialer, affald, updateFactors } = useData();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

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

  const parseFactorValue = (value: unknown) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === 'string') {
      const cleaned = value.replace(',', '.').trim();
      if (!cleaned) return null;
      const parsed = Number(cleaned);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
  };

  const handleExcelUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploadSuccess(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      if (!firstSheetName) {
        setUploadError('Excel-filen indeholder ingen ark.');
        return;
      }
      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json<Array<unknown>>(worksheet, {
        header: 1,
        defval: '',
      });
      const headerRow = rows[0] ?? [];
      const headerMap = new Map<string, number>();
      headerRow.forEach((value, index) => {
        if (typeof value === 'string') {
          headerMap.set(value.trim(), index);
        }
      });

      const requiredHeaders = ['Navn', 'Modul', 'Enhed', 'Faktor_kgCO2e_pr_enhed', 'Key'];
      const missingHeaders = requiredHeaders.filter((header) => !headerMap.has(header));
      if (missingHeaders.length > 0) {
        setUploadError(`Mangler kolonner: ${missingHeaders.join(', ')}`);
        return;
      }

      const factors: Factor[] = [];
      const errors: string[] = [];
      const usedKeys = new Set<string>();
      rows.slice(1).forEach((row, index) => {
        const name = String(row[headerMap.get('Navn') ?? -1] ?? '').trim();
        const module = String(row[headerMap.get('Modul') ?? -1] ?? '').trim();
        const unit = String(row[headerMap.get('Enhed') ?? -1] ?? '').trim();
        const key = String(row[headerMap.get('Key') ?? -1] ?? '').trim();
        const factorValue = parseFactorValue(row[headerMap.get('Faktor_kgCO2e_pr_enhed') ?? -1]);

        const isEmptyRow = !name && !module && !unit && !key && factorValue === null;
        if (isEmptyRow) return;

        const rowNumber = index + 2;
        if (!name || !module || !unit || !key || factorValue === null) {
          errors.push(`Række ${rowNumber}: Ugyldige eller manglende felter.`);
          return;
        }
        if (usedKeys.has(key)) {
          errors.push(`Række ${rowNumber}: Nøglen '${key}' er ikke unik.`);
          return;
        }
        usedKeys.add(key);
        factors.push({
          key,
          name,
          module,
          unit,
          factorKgCo2PerUnit: factorValue,
          source: 'Excel upload',
        });
      });

      if (errors.length > 0) {
        setUploadError(errors.slice(0, 3).join(' '));
        return;
      }
      if (factors.length === 0) {
        setUploadError('Der blev ikke fundet nogen gyldige faktorer i filen.');
        return;
      }

      updateFactors(factors);
      setUploadSuccess(`Indlæste ${factors.length} faktorer fra Excel.`);
    } catch (error) {
      console.error('Kunne ikke læse Excel-filen', error);
      setUploadError('Kunne ikke læse Excel-filen.');
    } finally {
      event.target.value = '';
    }
  };

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
        <h2 className="section-title">Upload emissionsfaktorer (Excel)</h2>
        <p>
          Upload en .xlsx-fil med kolonnerne Navn, Modul, Enhed, Faktor_kgCO2e_pr_enhed og Key for at erstatte alle
          emissionsfaktorer.
        </p>
        <div className="form-grid">
          <label>
            Excel-fil (.xlsx)
            <input type="file" accept=".xlsx" onChange={handleExcelUpload} />
          </label>
        </div>
        {uploadError ? <p className="error-text">{uploadError}</p> : null}
        {uploadSuccess ? <p>{uploadSuccess}</p> : null}
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
