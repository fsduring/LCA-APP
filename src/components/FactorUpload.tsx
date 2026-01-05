import { ChangeEvent, useState } from 'react';
import { useData } from '../data/DataProvider';

export function FactorUpload() {
  const { importFactors } = useData();
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setStatus(null);
    setIsLoading(true);
    try {
      const result = await importFactors(file);
      setStatus({
        type: 'success',
        message: `Importerede ${result.imported} faktorer (${result.format}). Sprang ${result.skipped} rækker over.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ukendt fejl under import.';
      setStatus({ type: 'error', message });
    } finally {
      setIsLoading(false);
      event.target.value = '';
    }
  };

  return (
    <section className="card">
      <h2 className="section-title">Importer faktorer</h2>
      <div className="form-grid">
        <label className="full">
          Upload Excel-fil
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </label>
        {status && (
          <span className={status.type === 'error' ? 'error-text' : ''}>
            {status.message}
          </span>
        )}
        {isLoading && <span>Importer...</span>}
      </div>
    </section>
  );
}
