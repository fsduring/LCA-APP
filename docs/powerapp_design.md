# LCA CO₂ Tracking Canvas App Design

Denne dokumentation beskriver, hvordan man bygger en mobilvenlig Microsoft Power Apps Canvas-app, der anvender Excel-filen `Gr9_A7_K00_C.08_Z01_LCA, C02 emisionsskema.xlsx` på SharePoint/OneDrive som datakilde. Appen understøtter registrering og visualisering af CO₂-aftryk fra en byggeplads.

## 1. Datakilde og tabeller

1. Placér Excel-filen på et SharePoint- eller OneDrive-dokumentbibliotek med adgang til Power Apps.
2. Sørg for, at hvert ark er formateret som en Excel-tabel:
   - Markér dataområdet (inklusive kolonneoverskrifterne) på hvert ark.
   - Vælg **Formater som tabel** i Excel, og giv tabellen et navn, der matcher arknavnet (fx `Faktorer`, `El`, `Vand`, `Braendstof`, `Materialer`, `Affald`, `Bygning`, `Oversigt`).
3. Gem filen og noter adressen til biblioteket.

## 2. Opret appen

1. Gå til [make.powerapps.com](https://make.powerapps.com) og vælg det ønskede miljø.
2. Vælg **Create → Blank app → Blank canvas app (mobile)**.
3. Angiv et navn, fx `LCA CO2 Tracker`, og vælg formatet **Phone**.
4. Når appen åbnes i Power Apps Studio, vælg **Data → Add data** og forbind til Excel-filen:
   - Vælg forbindelsen **OneDrive for Business** (eller SharePoint).
   - Navigér til filen og markér tabellerne `Faktorer`, `El`, `Vand`, `Braendstof`, `Materialer`, `Affald`, `Bygning` og `Oversigt`.

## 3. Generelle komponenter

### 3.1 Samlinger (Collections)
Til hurtigere opslag kan der dannes lokale samlinger ved app-start:

```powerfx
// App.OnStart
ClearCollect(colFaktorer, Faktorer);
ClearCollect(colEl, El);
ClearCollect(colVand, Vand);
ClearCollect(colBraendstof, Braendstof);
ClearCollect(colMaterialer, Materialer);
ClearCollect(colAffald, Affald);
ClearCollect(colBygning, Bygning);
```

Hver gang en post indsendes, opdateres både datakilden og den relevante samling:

```powerfx
// Efter SubmitForm
Refresh(El); // eller relevant tabel
ClearCollect(colEl, El);
```

### 3.2 Generelle valideringsformler
Til formularer anvendes `SubmitForm`. På `OnFailure` vises fejl via `Notify`, og `OnSuccess` nulstiller formularen.

```powerfx
EditForm_El.OnSuccess:
Notify("Registreringen er gemt", NotificationType.Success);
ResetForm(EditForm_El);
```

## 4. Skærme og funktionalitet

### 4.1 HomeScreen
- Tilføj fem knapper til kategorierne **El**, **Vand**, **Brændstof**, **Materialer**, **Affald** samt en knap **Oversigt / A1–A3 og A4–A5**.
- `OnSelect`-formler navigerer til de relevante skærme:

```powerfx
Navigate(ElScreen, ScreenTransition.Fade);
```

### 4.2 ElScreen (svarende for Vand, Brændstof, Materialer, Affald)

1. **Galleri** (`Gallery_El`):
   - `Items`: `Sort(colEl, Dato, Descending)`.
   - Vis felter som Dato, Type, Maengde, Beregnet_CO2_kgCO2e og Kommentar.
2. **Formular** (`EditForm_El`):
   - Datakilde: `El`.
   - DefaultMode: `FormMode.New`.
   - Felter: Dato, Type, Enhed (vises som label), Maengde, Kilde, Kommentar, CO2_faktor_kgCO2e_pr_enhed, Beregnet_CO2_kgCO2e.
   - Konfigurer datakort:
     - `Type_DataCard.Default`: Blank();
     - `Type_DataCard.Update`: `ddType_El.Selected.Value`.
     - `ddType_El.Items`: `colFaktorer`.
     - `ddType_El.DisplayFields`: `"Type"`.
   - Etiketter til Enhed og CO₂-faktor:

```powerfx
lblEnhed_El.Text: LookUp(colFaktorer, Type = ddType_El.Selected.Type).Enhed
lblCO2Factor_El.Text: LookUp(colFaktorer, Type = ddType_El.Selected.Type).CO2_faktor_kgCO2e_pr_enhed
```

   - `Beregnet_CO2_kgCO2e`-datakort (vises som tekstlabel og skjult input):

```powerfx
// Tekstlabel
lblBeregnCO2_El.Text:
With({factor: LookUp(colFaktorer, Type = ddType_El.Selected.Type).CO2_faktor_kgCO2e_pr_enhed},
    Value(txtMaengde_El.Text) * factor
)

// Update-egenskab
Beregnet_CO2_kgCO2e_DataCard.Update:
Value(lblBeregnCO2_El.Text)
```

   - `Maengde_DataCard.Required = true` og `Maengde_DataCard.Update = Value(txtMaengde_El.Text)`.
   - `Maengde_DataCard.Validate`: `Value(txtMaengde_El.Text) > 0`.
3. **Gem-knap** (`btnGem_El`):

```powerfx
OnSelect:
If(
    !IsBlank(DateValue(txtDato_El.SelectedDate)) &&
    !IsBlank(ddType_El.Selected) &&
    Value(txtMaengde_El.Text) > 0,
    SubmitForm(EditForm_El),
    Notify("Udfyld Dato, Type og Mængde (Mængde > 0)", NotificationType.Error)
);
```

4. Tilsvarende skærme oprettes for Vand, Brændstof, Materialer og Affald. På Materialer-skærmen tilføjes felter for `Produkt_Note`, `Transportmetode_abc` og `Transportdistance_km`. På Affald-skærmen tilføjes `Genanvendelse_procent`, `Modtager` og `Er_spild_Ja_Nej` (fx som Toggle/Dropdown).

### 4.3 BygningScreen

1. Indsæt en Edit Form (`EditForm_Bygning`), datakilde `Bygning`, DefaultMode `FormMode.Edit` og `Item = First(colBygning)`.
2. Felter: `Projekt_navn` (View-mode), `Bygning_areal_m2` (Edit).
3. Knappen **Gem** bruger `SubmitForm(EditForm_Bygning)`.

### 4.4 OversigtScreen

Tilføj labels/kort til at vise totaler og pr. m².

```powerfx
// Samlede værdier
Set(varA1A3, Sum(colMaterialer, Beregnet_CO2_kgCO2e));
Set(varA4A5, Sum(colEl, Beregnet_CO2_kgCO2e) + Sum(colVand, Beregnet_CO2_kgCO2e) + Sum(colBraendstof, Beregnet_CO2_kgCO2e) + Sum(colAffald, Beregnet_CO2_kgCO2e));
Set(varA1A5, varA1A3 + varA4A5);
Set(varAreal, If(!IsEmpty(colBygning), First(colBygning).Bygning_areal_m2, Blank()));
Set(varA1A3PrM2, If(varAreal > 0, varA1A3 / varAreal));
Set(varA4A5PrM2, If(varAreal > 0, varA4A5 / varAreal));
Set(varA1A5PrM2, If(varAreal > 0, varA1A5 / varAreal));
```

Kald ovenstående i `OnVisible`:

```powerfx
OnVisible:
Set(varAreal, If(!IsEmpty(colBygning), First(colBygning).Bygning_areal_m2, Blank()));
Set(varA1A3, Sum(colMaterialer, Beregnet_CO2_kgCO2e));
Set(varA4A5, Sum(colEl, Beregnet_CO2_kgCO2e) + Sum(colVand, Beregnet_CO2_kgCO2e) + Sum(colBraendstof, Beregnet_CO2_kgCO2e) + Sum(colAffald, Beregnet_CO2_kgCO2e));
Set(varA1A5, varA1A3 + varA4A5);
Set(varA1A3PrM2, If(varAreal > 0, varA1A3 / varAreal));
Set(varA4A5PrM2, If(varAreal > 0, varA4A5 / varAreal));
Set(varA1A5PrM2, If(varAreal > 0, varA1A5 / varAreal));
```

Labels:

| Label | Text-egenskab |
| --- | --- |
| `lblA1A3` | `$"A1–A3 total (kg CO₂e): {Round(varA1A3, 2)}"` |
| `lblA4A5` | `$"A4–A5 total (kg CO₂e): {Round(varA4A5, 2)}"` |
| `lblA1A5` | `$"A1–A5 total (kg CO₂e): {Round(varA1A5, 2)}"` |
| `lblA1A3m2` | `If(varAreal > 0, $"A1–A3 pr. m² (kg CO₂e/m²): {Round(varA1A3PrM2, 2)}", "Areal ikke angivet")` |
| `lblA4A5m2` | `If(varAreal > 0, $"A4–A5 pr. m² (kg CO₂e/m²): {Round(varA4A5PrM2, 2)}", "")` |
| `lblA1A5m2` | `If(varAreal > 0, $"A1–A5 pr. m² (kg CO₂e/m²): {Round(varA1A5PrM2, 2)}", "")` |

For at læse værdier fra `Oversigt`-arket kan du vise `First(Oversigt).B8` osv., men i denne app beregnes totalerne dynamisk.

## 5. Designprincipper

- Brug tema med høj kontrast og store knapper for mobilvenlighed.
- Tilpas gallerier til vertikal layout og brug `Flexible height` for kommentarer.
- Indsæt `Header`-komponent på alle skærme med tilbageknap (`Back()`).
- Formatér dato-indtastning med `DatePicker`.
- Brug `Dropdown`-kontroller for Type/Materiale/Fraktion:

```powerfx
ddType_El.Items: SortByColumns(colFaktorer, "Type")
ddType_El.SearchFields: ["Type"]
```

## 6. Beregning i Excel (valgfrit)

Excel kan indeholde formler til at udfylde kolonnerne `CO2_faktor_kgCO2e_pr_enhed` og `Beregnet_CO2_kgCO2e` (fx via `XLOOKUP`). Appen overskriver dog disse felter ved registreringerne.

## 7. Sikkerhed og flerbrugerscenarier

- Excel som datakilde egner sig bedst til teams med få samtidige brugere. Overvej SharePoint-lister eller Dataverse for større projekter.
- Aktivér versionering på dokumentbiblioteket for at bevare historik.

## 8. Test og validering

1. Tilføj testsæt med eksempeldataposter for hver kategori.
2. Kontroller, at `Beregnet_CO2_kgCO2e` opdateres korrekt ved ændringer i `Maengde` eller valgte typer.
3. Verificér at Bygningens areal opdateres og indgår i beregningerne på Oversigt-skærmen.

## 9. Videreudvikling

- Tilføj grafer (fx `Column chart`) for visuel sammenligning mellem kategorier.
- Implementér filtrering per dato eller periode.
- Eksportér data til PDF/Excel via Power Automate.

## 10. Udrulning

1. Gem appen og udgiv den i miljøet.
2. Del appen med relevante brugere og giv skriveadgang til Excel-filen.

Denne vejledning sikrer, at appen opfylder kravene til registrering, beregning og visning af CO₂-aftryk for en byggeplads baseret på de angivne Excel-tabeller.
