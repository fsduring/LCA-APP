export type Factor = {
  key: string;
  name: string;
  module: string;
  unit: string;
  factorKgCO2ePerUnit: number;
  source: string;
  kgPerUnitForAffald?: number;
};

export const FACTORS: Factor[] = [
  {
    "key": "el_dk_elmix",
    "name": "El (DK elmix)",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.233,
    "source": "Placeholder"
  },
  {
    "key": "vand_drikkevand",
    "name": "Vand (drikkevand)",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.344,
    "source": "Placeholder"
  },
  {
    "key": "diesel_b7",
    "name": "Diesel (B7)",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.67,
    "source": "Placeholder"
  },
  {
    "key": "beton_c25_30",
    "name": "Fabriksbeton (C25/30) i eksponeringsklasserne X0 og XC1",
    "module": "A1-A3",
    "unit": "m3",
    "factorKgCO2ePerUnit": 320.5,
    "source": "Placeholder"
  },
  {
    "key": "gipsplade_13mm",
    "name": "Gipsplade 13 mm",
    "module": "A1-A3",
    "unit": "m2",
    "factorKgCO2ePerUnit": 12.5,
    "source": "Placeholder"
  },
  {
    "key": "teglsten_affald",
    "name": "Affald - teglsten (genanvendelse)",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.22,
    "source": "Placeholder"
  },
  {
    "key": "affald_gips_haandtering",
    "name": "Affald - gips (håndtering)",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.08,
    "source": "Placeholder"
  },
  {
    "key": "el_type_001",
    "name": "El-type 1",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.0525,
    "source": "Placeholder"
  },
  {
    "key": "el_type_002",
    "name": "El-type 2",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.055,
    "source": "Placeholder"
  },
  {
    "key": "el_type_003",
    "name": "El-type 3",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.0575,
    "source": "Placeholder"
  },
  {
    "key": "el_type_004",
    "name": "El-type 4",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.06,
    "source": "Placeholder"
  },
  {
    "key": "el_type_005",
    "name": "El-type 5",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.0625,
    "source": "Placeholder"
  },
  {
    "key": "el_type_006",
    "name": "El-type 6",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.065,
    "source": "Placeholder"
  },
  {
    "key": "el_type_007",
    "name": "El-type 7",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.0675,
    "source": "Placeholder"
  },
  {
    "key": "el_type_008",
    "name": "El-type 8",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.07,
    "source": "Placeholder"
  },
  {
    "key": "el_type_009",
    "name": "El-type 9",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.0725,
    "source": "Placeholder"
  },
  {
    "key": "el_type_010",
    "name": "El-type 10",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.075,
    "source": "Placeholder"
  },
  {
    "key": "el_type_011",
    "name": "El-type 11",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.0775,
    "source": "Placeholder"
  },
  {
    "key": "el_type_012",
    "name": "El-type 12",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.08,
    "source": "Placeholder"
  },
  {
    "key": "el_type_013",
    "name": "El-type 13",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.0825,
    "source": "Placeholder"
  },
  {
    "key": "el_type_014",
    "name": "El-type 14",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.085,
    "source": "Placeholder"
  },
  {
    "key": "el_type_015",
    "name": "El-type 15",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.0875,
    "source": "Placeholder"
  },
  {
    "key": "el_type_016",
    "name": "El-type 16",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.09,
    "source": "Placeholder"
  },
  {
    "key": "el_type_017",
    "name": "El-type 17",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.0925,
    "source": "Placeholder"
  },
  {
    "key": "el_type_018",
    "name": "El-type 18",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.095,
    "source": "Placeholder"
  },
  {
    "key": "el_type_019",
    "name": "El-type 19",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.0975,
    "source": "Placeholder"
  },
  {
    "key": "el_type_020",
    "name": "El-type 20",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1,
    "source": "Placeholder"
  },
  {
    "key": "el_type_021",
    "name": "El-type 21",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1025,
    "source": "Placeholder"
  },
  {
    "key": "el_type_022",
    "name": "El-type 22",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.105,
    "source": "Placeholder"
  },
  {
    "key": "el_type_023",
    "name": "El-type 23",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1075,
    "source": "Placeholder"
  },
  {
    "key": "el_type_024",
    "name": "El-type 24",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.11,
    "source": "Placeholder"
  },
  {
    "key": "el_type_025",
    "name": "El-type 25",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1125,
    "source": "Placeholder"
  },
  {
    "key": "el_type_026",
    "name": "El-type 26",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.115,
    "source": "Placeholder"
  },
  {
    "key": "el_type_027",
    "name": "El-type 27",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1175,
    "source": "Placeholder"
  },
  {
    "key": "el_type_028",
    "name": "El-type 28",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.12,
    "source": "Placeholder"
  },
  {
    "key": "el_type_029",
    "name": "El-type 29",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1225,
    "source": "Placeholder"
  },
  {
    "key": "el_type_030",
    "name": "El-type 30",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.125,
    "source": "Placeholder"
  },
  {
    "key": "el_type_031",
    "name": "El-type 31",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1275,
    "source": "Placeholder"
  },
  {
    "key": "el_type_032",
    "name": "El-type 32",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.13,
    "source": "Placeholder"
  },
  {
    "key": "el_type_033",
    "name": "El-type 33",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1325,
    "source": "Placeholder"
  },
  {
    "key": "el_type_034",
    "name": "El-type 34",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.135,
    "source": "Placeholder"
  },
  {
    "key": "el_type_035",
    "name": "El-type 35",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1375,
    "source": "Placeholder"
  },
  {
    "key": "el_type_036",
    "name": "El-type 36",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.14,
    "source": "Placeholder"
  },
  {
    "key": "el_type_037",
    "name": "El-type 37",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1425,
    "source": "Placeholder"
  },
  {
    "key": "el_type_038",
    "name": "El-type 38",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.145,
    "source": "Placeholder"
  },
  {
    "key": "el_type_039",
    "name": "El-type 39",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1475,
    "source": "Placeholder"
  },
  {
    "key": "el_type_040",
    "name": "El-type 40",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.15,
    "source": "Placeholder"
  },
  {
    "key": "el_type_041",
    "name": "El-type 41",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1525,
    "source": "Placeholder"
  },
  {
    "key": "el_type_042",
    "name": "El-type 42",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.155,
    "source": "Placeholder"
  },
  {
    "key": "el_type_043",
    "name": "El-type 43",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1575,
    "source": "Placeholder"
  },
  {
    "key": "el_type_044",
    "name": "El-type 44",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.16,
    "source": "Placeholder"
  },
  {
    "key": "el_type_045",
    "name": "El-type 45",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1625,
    "source": "Placeholder"
  },
  {
    "key": "el_type_046",
    "name": "El-type 46",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.165,
    "source": "Placeholder"
  },
  {
    "key": "el_type_047",
    "name": "El-type 47",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1675,
    "source": "Placeholder"
  },
  {
    "key": "el_type_048",
    "name": "El-type 48",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.17,
    "source": "Placeholder"
  },
  {
    "key": "el_type_049",
    "name": "El-type 49",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.1725,
    "source": "Placeholder"
  },
  {
    "key": "el_type_050",
    "name": "El-type 50",
    "module": "A5",
    "unit": "kWh",
    "factorKgCO2ePerUnit": 0.175,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_001",
    "name": "Vandtype 1",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.2035,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_002",
    "name": "Vandtype 2",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.207,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_003",
    "name": "Vandtype 3",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.2105,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_004",
    "name": "Vandtype 4",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.214,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_005",
    "name": "Vandtype 5",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.2175,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_006",
    "name": "Vandtype 6",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.221,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_007",
    "name": "Vandtype 7",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.2245,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_008",
    "name": "Vandtype 8",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.228,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_009",
    "name": "Vandtype 9",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.2315,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_010",
    "name": "Vandtype 10",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.235,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_011",
    "name": "Vandtype 11",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.2385,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_012",
    "name": "Vandtype 12",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.242,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_013",
    "name": "Vandtype 13",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.2455,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_014",
    "name": "Vandtype 14",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.249,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_015",
    "name": "Vandtype 15",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.2525,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_016",
    "name": "Vandtype 16",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.256,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_017",
    "name": "Vandtype 17",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.2595,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_018",
    "name": "Vandtype 18",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.263,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_019",
    "name": "Vandtype 19",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.2665,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_020",
    "name": "Vandtype 20",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.27,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_021",
    "name": "Vandtype 21",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.2735,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_022",
    "name": "Vandtype 22",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.277,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_023",
    "name": "Vandtype 23",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.2805,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_024",
    "name": "Vandtype 24",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.284,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_025",
    "name": "Vandtype 25",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.2875,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_026",
    "name": "Vandtype 26",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.291,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_027",
    "name": "Vandtype 27",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.2945,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_028",
    "name": "Vandtype 28",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.298,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_029",
    "name": "Vandtype 29",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.3015,
    "source": "Placeholder"
  },
  {
    "key": "vand_type_030",
    "name": "Vandtype 30",
    "module": "A5",
    "unit": "m3",
    "factorKgCO2ePerUnit": 0.305,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_001",
    "name": "Brændstof-type 1",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.525,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_002",
    "name": "Brændstof-type 2",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.55,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_003",
    "name": "Brændstof-type 3",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.575,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_004",
    "name": "Brændstof-type 4",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.6,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_005",
    "name": "Brændstof-type 5",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.625,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_006",
    "name": "Brændstof-type 6",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.65,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_007",
    "name": "Brændstof-type 7",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.675,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_008",
    "name": "Brændstof-type 8",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.7,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_009",
    "name": "Brændstof-type 9",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.725,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_010",
    "name": "Brændstof-type 10",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.75,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_011",
    "name": "Brændstof-type 11",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.775,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_012",
    "name": "Brændstof-type 12",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.8,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_013",
    "name": "Brændstof-type 13",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.825,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_014",
    "name": "Brændstof-type 14",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.85,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_015",
    "name": "Brændstof-type 15",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.875,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_016",
    "name": "Brændstof-type 16",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.9,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_017",
    "name": "Brændstof-type 17",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.925,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_018",
    "name": "Brændstof-type 18",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.95,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_019",
    "name": "Brændstof-type 19",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 1.975,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_020",
    "name": "Brændstof-type 20",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_021",
    "name": "Brændstof-type 21",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.025,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_022",
    "name": "Brændstof-type 22",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.05,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_023",
    "name": "Brændstof-type 23",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.075,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_024",
    "name": "Brændstof-type 24",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.1,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_025",
    "name": "Brændstof-type 25",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.125,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_026",
    "name": "Brændstof-type 26",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.15,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_027",
    "name": "Brændstof-type 27",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.175,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_028",
    "name": "Brændstof-type 28",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.2,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_029",
    "name": "Brændstof-type 29",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.225,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_030",
    "name": "Brændstof-type 30",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.25,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_031",
    "name": "Brændstof-type 31",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.275,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_032",
    "name": "Brændstof-type 32",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.3,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_033",
    "name": "Brændstof-type 33",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.325,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_034",
    "name": "Brændstof-type 34",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.35,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_035",
    "name": "Brændstof-type 35",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.375,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_036",
    "name": "Brændstof-type 36",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.4,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_037",
    "name": "Brændstof-type 37",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.425,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_038",
    "name": "Brændstof-type 38",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.45,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_039",
    "name": "Brændstof-type 39",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.475,
    "source": "Placeholder"
  },
  {
    "key": "fuel_type_040",
    "name": "Brændstof-type 40",
    "module": "A4",
    "unit": "L",
    "factorKgCO2ePerUnit": 2.5,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_001",
    "name": "Materiale 1",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.154,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_002",
    "name": "Materiale 2",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.158,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_003",
    "name": "Materiale 3",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.162,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_004",
    "name": "Materiale 4",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.166,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_005",
    "name": "Materiale 5",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.17,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_006",
    "name": "Materiale 6",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.174,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_007",
    "name": "Materiale 7",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.178,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_008",
    "name": "Materiale 8",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.182,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_009",
    "name": "Materiale 9",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.186,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_010",
    "name": "Materiale 10",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.19,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_011",
    "name": "Materiale 11",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.194,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_012",
    "name": "Materiale 12",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.198,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_013",
    "name": "Materiale 13",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.202,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_014",
    "name": "Materiale 14",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.206,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_015",
    "name": "Materiale 15",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.21,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_016",
    "name": "Materiale 16",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.214,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_017",
    "name": "Materiale 17",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.218,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_018",
    "name": "Materiale 18",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.222,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_019",
    "name": "Materiale 19",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.226,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_020",
    "name": "Materiale 20",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.23,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_021",
    "name": "Materiale 21",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.234,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_022",
    "name": "Materiale 22",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.238,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_023",
    "name": "Materiale 23",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.242,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_024",
    "name": "Materiale 24",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.246,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_025",
    "name": "Materiale 25",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.25,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_026",
    "name": "Materiale 26",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.254,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_027",
    "name": "Materiale 27",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.258,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_028",
    "name": "Materiale 28",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.262,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_029",
    "name": "Materiale 29",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.266,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_030",
    "name": "Materiale 30",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.27,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_031",
    "name": "Materiale 31",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.274,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_032",
    "name": "Materiale 32",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.278,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_033",
    "name": "Materiale 33",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.282,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_034",
    "name": "Materiale 34",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.286,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_035",
    "name": "Materiale 35",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.29,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_036",
    "name": "Materiale 36",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.294,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_037",
    "name": "Materiale 37",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.298,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_038",
    "name": "Materiale 38",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.302,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_039",
    "name": "Materiale 39",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.306,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_040",
    "name": "Materiale 40",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.31,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_041",
    "name": "Materiale 41",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.314,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_042",
    "name": "Materiale 42",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.318,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_043",
    "name": "Materiale 43",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.322,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_044",
    "name": "Materiale 44",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.326,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_045",
    "name": "Materiale 45",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.33,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_046",
    "name": "Materiale 46",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.334,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_047",
    "name": "Materiale 47",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.338,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_048",
    "name": "Materiale 48",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.342,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_049",
    "name": "Materiale 49",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.346,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_050",
    "name": "Materiale 50",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.35,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_051",
    "name": "Materiale 51",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.354,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_052",
    "name": "Materiale 52",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.358,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_053",
    "name": "Materiale 53",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.362,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_054",
    "name": "Materiale 54",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.366,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_055",
    "name": "Materiale 55",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.37,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_056",
    "name": "Materiale 56",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.374,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_057",
    "name": "Materiale 57",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.378,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_058",
    "name": "Materiale 58",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.382,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_059",
    "name": "Materiale 59",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.386,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_060",
    "name": "Materiale 60",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.39,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_061",
    "name": "Materiale 61",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.394,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_062",
    "name": "Materiale 62",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.398,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_063",
    "name": "Materiale 63",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.402,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_064",
    "name": "Materiale 64",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.406,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_065",
    "name": "Materiale 65",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.41,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_066",
    "name": "Materiale 66",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.414,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_067",
    "name": "Materiale 67",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.418,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_068",
    "name": "Materiale 68",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.422,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_069",
    "name": "Materiale 69",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.426,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_070",
    "name": "Materiale 70",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.43,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_071",
    "name": "Materiale 71",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.434,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_072",
    "name": "Materiale 72",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.438,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_073",
    "name": "Materiale 73",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.442,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_074",
    "name": "Materiale 74",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.446,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_075",
    "name": "Materiale 75",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.45,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_076",
    "name": "Materiale 76",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.454,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_077",
    "name": "Materiale 77",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.458,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_078",
    "name": "Materiale 78",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.462,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_079",
    "name": "Materiale 79",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.466,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_080",
    "name": "Materiale 80",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.47,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_081",
    "name": "Materiale 81",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.474,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_082",
    "name": "Materiale 82",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.478,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_083",
    "name": "Materiale 83",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.482,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_084",
    "name": "Materiale 84",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.486,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_085",
    "name": "Materiale 85",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.49,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_086",
    "name": "Materiale 86",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.494,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_087",
    "name": "Materiale 87",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.498,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_088",
    "name": "Materiale 88",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.502,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_089",
    "name": "Materiale 89",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.506,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_090",
    "name": "Materiale 90",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.51,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_091",
    "name": "Materiale 91",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.514,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_092",
    "name": "Materiale 92",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.518,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_093",
    "name": "Materiale 93",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.522,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_094",
    "name": "Materiale 94",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.526,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_095",
    "name": "Materiale 95",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.53,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_096",
    "name": "Materiale 96",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.534,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_097",
    "name": "Materiale 97",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.538,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_098",
    "name": "Materiale 98",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.542,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_099",
    "name": "Materiale 99",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.546,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_100",
    "name": "Materiale 100",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.55,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_101",
    "name": "Materiale 101",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.554,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_102",
    "name": "Materiale 102",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.558,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_103",
    "name": "Materiale 103",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.562,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_104",
    "name": "Materiale 104",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.566,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_105",
    "name": "Materiale 105",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.57,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_106",
    "name": "Materiale 106",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.574,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_107",
    "name": "Materiale 107",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.578,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_108",
    "name": "Materiale 108",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.582,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_109",
    "name": "Materiale 109",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.586,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_110",
    "name": "Materiale 110",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.59,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_111",
    "name": "Materiale 111",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.594,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_112",
    "name": "Materiale 112",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.598,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_113",
    "name": "Materiale 113",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.602,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_114",
    "name": "Materiale 114",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.606,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_115",
    "name": "Materiale 115",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.61,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_116",
    "name": "Materiale 116",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.614,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_117",
    "name": "Materiale 117",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.618,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_118",
    "name": "Materiale 118",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.622,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_119",
    "name": "Materiale 119",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.626,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_120",
    "name": "Materiale 120",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.63,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_121",
    "name": "Materiale 121",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.634,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_122",
    "name": "Materiale 122",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.638,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_123",
    "name": "Materiale 123",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.642,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_124",
    "name": "Materiale 124",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.646,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_125",
    "name": "Materiale 125",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.65,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_126",
    "name": "Materiale 126",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.654,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_127",
    "name": "Materiale 127",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.658,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_128",
    "name": "Materiale 128",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.662,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_129",
    "name": "Materiale 129",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.666,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_130",
    "name": "Materiale 130",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.67,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_131",
    "name": "Materiale 131",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.674,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_132",
    "name": "Materiale 132",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.678,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_133",
    "name": "Materiale 133",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.682,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_134",
    "name": "Materiale 134",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.686,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_135",
    "name": "Materiale 135",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.69,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_136",
    "name": "Materiale 136",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.694,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_137",
    "name": "Materiale 137",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.698,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_138",
    "name": "Materiale 138",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.702,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_139",
    "name": "Materiale 139",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.706,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_140",
    "name": "Materiale 140",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.71,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_141",
    "name": "Materiale 141",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.714,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_142",
    "name": "Materiale 142",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.718,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_143",
    "name": "Materiale 143",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.722,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_144",
    "name": "Materiale 144",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.726,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_145",
    "name": "Materiale 145",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.73,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_146",
    "name": "Materiale 146",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.734,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_147",
    "name": "Materiale 147",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.738,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_148",
    "name": "Materiale 148",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.742,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_149",
    "name": "Materiale 149",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.746,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_150",
    "name": "Materiale 150",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.75,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_151",
    "name": "Materiale 151",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.754,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_152",
    "name": "Materiale 152",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.758,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_153",
    "name": "Materiale 153",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.762,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_154",
    "name": "Materiale 154",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.766,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_155",
    "name": "Materiale 155",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.77,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_156",
    "name": "Materiale 156",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.774,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_157",
    "name": "Materiale 157",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.778,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_158",
    "name": "Materiale 158",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.782,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_159",
    "name": "Materiale 159",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.786,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_160",
    "name": "Materiale 160",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.79,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_161",
    "name": "Materiale 161",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.794,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_162",
    "name": "Materiale 162",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.798,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_163",
    "name": "Materiale 163",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.802,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_164",
    "name": "Materiale 164",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.806,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_165",
    "name": "Materiale 165",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.81,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_166",
    "name": "Materiale 166",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.814,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_167",
    "name": "Materiale 167",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.818,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_168",
    "name": "Materiale 168",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.822,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_169",
    "name": "Materiale 169",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.826,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_170",
    "name": "Materiale 170",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.83,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_171",
    "name": "Materiale 171",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.834,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_172",
    "name": "Materiale 172",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.838,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_173",
    "name": "Materiale 173",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.842,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_174",
    "name": "Materiale 174",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.846,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_175",
    "name": "Materiale 175",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.85,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_176",
    "name": "Materiale 176",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.854,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_177",
    "name": "Materiale 177",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.858,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_178",
    "name": "Materiale 178",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.862,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_179",
    "name": "Materiale 179",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.866,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_180",
    "name": "Materiale 180",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.87,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_181",
    "name": "Materiale 181",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.874,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_182",
    "name": "Materiale 182",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.878,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_183",
    "name": "Materiale 183",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.882,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_184",
    "name": "Materiale 184",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.886,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_185",
    "name": "Materiale 185",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.89,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_186",
    "name": "Materiale 186",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.894,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_187",
    "name": "Materiale 187",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.898,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_188",
    "name": "Materiale 188",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.902,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_189",
    "name": "Materiale 189",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.906,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_190",
    "name": "Materiale 190",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.91,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_191",
    "name": "Materiale 191",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.914,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_192",
    "name": "Materiale 192",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.918,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_193",
    "name": "Materiale 193",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.922,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_194",
    "name": "Materiale 194",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.926,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_195",
    "name": "Materiale 195",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.93,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_196",
    "name": "Materiale 196",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.934,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_197",
    "name": "Materiale 197",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.938,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_198",
    "name": "Materiale 198",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.942,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_199",
    "name": "Materiale 199",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.946,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_200",
    "name": "Materiale 200",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.95,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_201",
    "name": "Materiale 201",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.954,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_202",
    "name": "Materiale 202",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.958,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_203",
    "name": "Materiale 203",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.962,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_204",
    "name": "Materiale 204",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.966,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_205",
    "name": "Materiale 205",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.97,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_206",
    "name": "Materiale 206",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.974,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_207",
    "name": "Materiale 207",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.978,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_208",
    "name": "Materiale 208",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.982,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_209",
    "name": "Materiale 209",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.986,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_210",
    "name": "Materiale 210",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.99,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_211",
    "name": "Materiale 211",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.994,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_212",
    "name": "Materiale 212",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.998,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_213",
    "name": "Materiale 213",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 1.002,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_214",
    "name": "Materiale 214",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 1.006,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_215",
    "name": "Materiale 215",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 1.01,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_216",
    "name": "Materiale 216",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 1.014,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_217",
    "name": "Materiale 217",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 1.018,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_218",
    "name": "Materiale 218",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 1.022,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_219",
    "name": "Materiale 219",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 1.026,
    "source": "Placeholder"
  },
  {
    "key": "materiale_type_220",
    "name": "Materiale 220",
    "module": "A1-A3",
    "unit": "kg",
    "factorKgCO2ePerUnit": 1.03,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_001",
    "name": "Affald 1",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.052,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_002",
    "name": "Affald 2",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.054,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_003",
    "name": "Affald 3",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.056,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_004",
    "name": "Affald 4",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.058,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_005",
    "name": "Affald 5",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.06,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_006",
    "name": "Affald 6",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.062,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_007",
    "name": "Affald 7",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.064,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_008",
    "name": "Affald 8",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.066,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_009",
    "name": "Affald 9",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.068,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_010",
    "name": "Affald 10",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.07,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_011",
    "name": "Affald 11",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.072,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_012",
    "name": "Affald 12",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.074,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_013",
    "name": "Affald 13",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.076,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_014",
    "name": "Affald 14",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.078,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_015",
    "name": "Affald 15",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.08,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_016",
    "name": "Affald 16",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.082,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_017",
    "name": "Affald 17",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.084,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_018",
    "name": "Affald 18",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.086,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_019",
    "name": "Affald 19",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.088,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_020",
    "name": "Affald 20",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.09,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_021",
    "name": "Affald 21",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.092,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_022",
    "name": "Affald 22",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.094,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_023",
    "name": "Affald 23",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.096,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_024",
    "name": "Affald 24",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.098,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_025",
    "name": "Affald 25",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.1,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_026",
    "name": "Affald 26",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.102,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_027",
    "name": "Affald 27",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.104,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_028",
    "name": "Affald 28",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.106,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_029",
    "name": "Affald 29",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.108,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_030",
    "name": "Affald 30",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.11,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_031",
    "name": "Affald 31",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.112,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_032",
    "name": "Affald 32",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.114,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_033",
    "name": "Affald 33",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.116,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_034",
    "name": "Affald 34",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.118,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_035",
    "name": "Affald 35",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.12,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_036",
    "name": "Affald 36",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.122,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_037",
    "name": "Affald 37",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.124,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_038",
    "name": "Affald 38",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.126,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_039",
    "name": "Affald 39",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.128,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_040",
    "name": "Affald 40",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.13,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_041",
    "name": "Affald 41",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.132,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_042",
    "name": "Affald 42",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.134,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_043",
    "name": "Affald 43",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.136,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_044",
    "name": "Affald 44",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.138,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_045",
    "name": "Affald 45",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.14,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_046",
    "name": "Affald 46",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.142,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_047",
    "name": "Affald 47",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.144,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_048",
    "name": "Affald 48",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.146,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_049",
    "name": "Affald 49",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.148,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_050",
    "name": "Affald 50",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.15,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_051",
    "name": "Affald 51",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.152,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_052",
    "name": "Affald 52",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.154,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_053",
    "name": "Affald 53",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.156,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_054",
    "name": "Affald 54",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.158,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_055",
    "name": "Affald 55",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.16,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_056",
    "name": "Affald 56",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.162,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_057",
    "name": "Affald 57",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.164,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_058",
    "name": "Affald 58",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.166,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_059",
    "name": "Affald 59",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.168,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_060",
    "name": "Affald 60",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.17,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_061",
    "name": "Affald 61",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.172,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_062",
    "name": "Affald 62",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.174,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_063",
    "name": "Affald 63",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.176,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_064",
    "name": "Affald 64",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.178,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_065",
    "name": "Affald 65",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.18,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_066",
    "name": "Affald 66",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.182,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_067",
    "name": "Affald 67",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.184,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_068",
    "name": "Affald 68",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.186,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_069",
    "name": "Affald 69",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.188,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_070",
    "name": "Affald 70",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.19,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_071",
    "name": "Affald 71",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.192,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_072",
    "name": "Affald 72",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.194,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_073",
    "name": "Affald 73",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.196,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_074",
    "name": "Affald 74",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.198,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_075",
    "name": "Affald 75",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.2,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_076",
    "name": "Affald 76",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.202,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_077",
    "name": "Affald 77",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.204,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_078",
    "name": "Affald 78",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.206,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_079",
    "name": "Affald 79",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.208,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_080",
    "name": "Affald 80",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.21,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_081",
    "name": "Affald 81",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.212,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_082",
    "name": "Affald 82",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.214,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_083",
    "name": "Affald 83",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.216,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_084",
    "name": "Affald 84",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.218,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_085",
    "name": "Affald 85",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.22,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_086",
    "name": "Affald 86",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.222,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_087",
    "name": "Affald 87",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.224,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_088",
    "name": "Affald 88",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.226,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_089",
    "name": "Affald 89",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.228,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_090",
    "name": "Affald 90",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.23,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_091",
    "name": "Affald 91",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.232,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_092",
    "name": "Affald 92",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.234,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_093",
    "name": "Affald 93",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.236,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_094",
    "name": "Affald 94",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.238,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_095",
    "name": "Affald 95",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.24,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_096",
    "name": "Affald 96",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.242,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_097",
    "name": "Affald 97",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.244,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_098",
    "name": "Affald 98",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.246,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_099",
    "name": "Affald 99",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.248,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_100",
    "name": "Affald 100",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.25,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_101",
    "name": "Affald 101",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.252,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_102",
    "name": "Affald 102",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.254,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_103",
    "name": "Affald 103",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.256,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_104",
    "name": "Affald 104",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.258,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_105",
    "name": "Affald 105",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.26,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_106",
    "name": "Affald 106",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.262,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_107",
    "name": "Affald 107",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.264,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_108",
    "name": "Affald 108",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.266,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_109",
    "name": "Affald 109",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.268,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_110",
    "name": "Affald 110",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.27,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_111",
    "name": "Affald 111",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.272,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_112",
    "name": "Affald 112",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.274,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_113",
    "name": "Affald 113",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.276,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_114",
    "name": "Affald 114",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.278,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_115",
    "name": "Affald 115",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.28,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_116",
    "name": "Affald 116",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.282,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_117",
    "name": "Affald 117",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.284,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_118",
    "name": "Affald 118",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.286,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_119",
    "name": "Affald 119",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.288,
    "source": "Placeholder"
  },
  {
    "key": "affald_type_120",
    "name": "Affald 120",
    "module": "A5",
    "unit": "kg",
    "factorKgCO2ePerUnit": 0.29,
    "source": "Placeholder"
  }
];
