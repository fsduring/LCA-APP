# LCA-APP

Dette repository indeholder en mobilvenlig React-applikation i TypeScript til registrering og visning af CO₂-aftryk fra en byggeplads. Appen afspejler strukturen i Excel-arbejdsbogen “Gr9_A7_K00_C.08_Z01_LCA, C02 emisionsskema.xlsx” og gemmer data lokalt (localStorage) via en indbygget “fake backend”.

## Hurtig start

```bash
npm install
npm run dev
```

Åbn derefter den viste URL (som regel http://localhost:5173) på mobil eller desktop. Sampledata er inkluderet fra start, så du kan se totals og registreringer med det samme.

## Funktioner

- Registrering af el, vand, brændstof, materialer og affald med opslag i lokale emissionsfaktorer.
- Upload af emissionsfaktorer understøtter BR2025 Tabel 7 via kolonnerne Navn DK, Global Opvarmning, modul A1-A3 og Deklareret enhed (FU).
- Automatisk beregning af CO₂-udledning pr. post og summering på oversigtssiden, inkl. A1–A3, A4–A5 og CO₂ pr. m² baseret på bygningsareal.
- Redigering af bygningsdata, som gemmes i localStorage og deles på tværs af sider.
- Responsivt layout optimeret til mobil (max bredde 560 px) med bundnavigation mellem siderne.

## Projektstruktur

- `src/data` – TypeScript-typer, startdata og DataProvider (context + localStorage).
- `src/pages` – Sider til hver kategori samt oversigt og bygningsoplysninger.
- `src/components` – Genbrugelige UI-komponenter (fx navigation).
- `docs/powerapp_design.md` – oprindelig Power Apps-designvejledning til reference.
