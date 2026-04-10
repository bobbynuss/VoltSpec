import type { Job } from "./types";
import { JOBS as AUSTIN_JOBS } from "./jobs";
import { SA_JOBS } from "./san-antonio/jobs";
import { HOUSTON_JOBS } from "./houston/jobs";
import { DALLAS_JOBS } from "./dallas/jobs";
import { PEC_JOBS } from "./pec/jobs";
import { GVEC_JOBS } from "./gvec/jobs";
import { BEC_JOBS } from "./bec/jobs";
import { AMARILLO_JOBS } from "./amarillo/jobs";
import { ELPASO_JOBS } from "./elpaso/jobs";
import { BROWNSVILLE_JOBS } from "./brownsville/jobs";
import { ABILENE_JOBS } from "./abilene/jobs";
import { ODESSA_JOBS } from "./odessa/jobs";
import { WACO_JOBS } from "./waco/jobs";
import { TEMPLE_KILLEEN_JOBS } from "./temple-killeen/jobs";
import { WICHITA_FALLS_JOBS } from "./wichita-falls/jobs";
import { LUBBOCK_JOBS } from "./lubbock/jobs";
import { BRYAN_JOBS } from "./bryan/jobs";
import { TYLER_JOBS } from "./tyler/jobs";
import { LUFKIN_JOBS } from "./lufkin/jobs";
import { SAN_ANGELO_JOBS } from "./san-angelo/jobs";
import { LAREDO_JOBS } from "./laredo/jobs";
import { SHREVEPORT_JOBS } from "./shreveport/jobs";
import { MONROE_JOBS } from "./monroe-la/jobs";
import { ALEXANDRIA_JOBS as ALEXANDRIA_LA_JOBS } from "./alexandria-la/jobs";
import { LAFAYETTE_JOBS } from "./lafayette/jobs";
import { LAKE_CHARLES_JOBS } from "./lake-charles/jobs";
import { BATON_ROUGE_JOBS } from "./baton-rouge/jobs";
import { NEW_ORLEANS_JOBS } from "./new-orleans/jobs";
import { OKC_JOBS } from "./oklahoma-city/jobs";
import { TULSA_JOBS } from "./tulsa/jobs";
import { LAWTON_JOBS } from "./lawton/jobs";
import { LITTLE_ROCK_JOBS } from "./little-rock/jobs";
import { FORT_SMITH_JOBS } from "./fort-smith/jobs";
import { SPRINGDALE_JOBS } from "./springdale/jobs";

export interface Jurisdiction {
  id: string;
  label: string;
  shortLabel: string;
  utility: string;
  county: string;
  defaultZip: string;
  zipPrefixes: string[];
  jobs: Job[];
}

export const JURISDICTIONS: Jurisdiction[] = [
  {
    id: "austin",
    label: "Austin, TX (Travis County)",
    shortLabel: "Austin, TX",
    utility: "Austin Energy",
    county: "Travis County",
    defaultZip: "78744",
    zipPrefixes: ["787", "786"],
    jobs: AUSTIN_JOBS,
  },
  {
    id: "san-antonio",
    label: "San Antonio, TX (Bexar County)",
    shortLabel: "San Antonio, TX",
    utility: "CPS Energy",
    county: "Bexar County",
    defaultZip: "78216",
    zipPrefixes: ["782", "781"],
    jobs: SA_JOBS,
  },
  {
    id: "houston",
    label: "Houston, TX (Harris County)",
    shortLabel: "Houston, TX",
    utility: "CenterPoint Energy",
    county: "Harris County",
    defaultZip: "77002",
    zipPrefixes: ["770", "771", "772", "773", "774", "775"],
    jobs: HOUSTON_JOBS,
  },
  {
    id: "pec",
    label: "Hill Country, TX (PEC)",
    shortLabel: "Hill Country (PEC)",
    utility: "Pedernales Electric Cooperative",
    county: "Multiple Counties",
    defaultZip: "78620",
    zipPrefixes: ["7862", "7861", "7865"],
    jobs: PEC_JOBS,
  },
  {
    id: "gvec",
    label: "Guadalupe Valley, TX (GVEC)",
    shortLabel: "Guadalupe Valley (GVEC)",
    utility: "Guadalupe Valley Electric Cooperative",
    county: "Multiple Counties",
    defaultZip: "78130",
    zipPrefixes: ["7813", "7816", "7815"],
    jobs: GVEC_JOBS,
  },
  {
    id: "bec",
    label: "Bandera Electric (BEC)",
    shortLabel: "Bandera Electric (BEC)",
    utility: "Bandera Electric Cooperative",
    county: "Bandera County",
    defaultZip: "78003",
    zipPrefixes: ["78003", "78063", "78006"],
    jobs: BEC_JOBS,
  },
  {
    id: "dallas",
    label: "Dallas/DFW, TX (Dallas County)",
    shortLabel: "Dallas/DFW, TX",
    utility: "Oncor Electric Delivery",
    county: "Dallas County",
    defaultZip: "75201",
    zipPrefixes: ["750", "751", "752", "753", "760", "761", "762"],
    jobs: DALLAS_JOBS,
  },
  {
    id: "amarillo",
    label: "Amarillo, TX (Potter County)",
    shortLabel: "Amarillo, TX",
    utility: "Xcel Energy (SPS)",
    county: "Potter County",
    defaultZip: "79101",
    zipPrefixes: ["791", "790"],
    jobs: AMARILLO_JOBS,
  },
  {
    id: "elpaso",
    label: "El Paso, TX (El Paso County)",
    shortLabel: "El Paso, TX",
    utility: "El Paso Electric",
    county: "El Paso County",
    defaultZip: "79901",
    zipPrefixes: ["799", "798"],
    jobs: ELPASO_JOBS,
  },
  {
    id: "brownsville",
    label: "Brownsville, TX (Cameron County)",
    shortLabel: "Brownsville, TX",
    utility: "AEP Texas Central",
    county: "Cameron County",
    defaultZip: "78520",
    zipPrefixes: ["785"],
    jobs: BROWNSVILLE_JOBS,
  },
  {
    id: "abilene",
    label: "Abilene, TX (Taylor County)",
    shortLabel: "Abilene, TX",
    utility: "AEP Texas North",
    county: "Taylor County",
    defaultZip: "79601",
    zipPrefixes: ["796"],
    jobs: ABILENE_JOBS,
  },
  {
    id: "odessa",
    label: "Odessa/Midland, TX (Ector County)",
    shortLabel: "Odessa/Midland, TX",
    utility: "Oncor Electric Delivery",
    county: "Ector County",
    defaultZip: "79761",
    zipPrefixes: ["797", "795"],
    jobs: ODESSA_JOBS,
  },
  {
    id: "waco",
    label: "Waco, TX (McLennan County)",
    shortLabel: "Waco, TX",
    utility: "Oncor Electric Delivery",
    county: "McLennan County",
    defaultZip: "76701",
    zipPrefixes: ["767"],
    jobs: WACO_JOBS,
  },
  {
    id: "temple-killeen",
    label: "Temple/Killeen, TX (Bell County)",
    shortLabel: "Temple/Killeen, TX",
    utility: "Oncor Electric Delivery",
    county: "Bell County",
    defaultZip: "76504",
    zipPrefixes: ["765"],
    jobs: TEMPLE_KILLEEN_JOBS,
  },
  {
    id: "wichita-falls",
    label: "Wichita Falls, TX (Wichita County)",
    shortLabel: "Wichita Falls, TX",
    utility: "Oncor Electric Delivery",
    county: "Wichita County",
    defaultZip: "76301",
    zipPrefixes: ["763"],
    jobs: WICHITA_FALLS_JOBS,
  },
  {
    id: "lubbock",
    label: "Lubbock, TX (Lubbock County)",
    shortLabel: "Lubbock, TX",
    utility: "Lubbock Power & Light",
    county: "Lubbock County",
    defaultZip: "79401",
    zipPrefixes: ["794"],
    jobs: LUBBOCK_JOBS,
  },
  {
    id: "bryan",
    label: "Bryan/College Station, TX (Brazos County)",
    shortLabel: "Bryan/College Station, TX",
    utility: "Bryan Texas Utilities",
    county: "Brazos County",
    defaultZip: "77801",
    zipPrefixes: ["778"],
    jobs: BRYAN_JOBS,
  },
  {
    id: "tyler",
    label: "Tyler/Longview, TX (Smith County)",
    shortLabel: "Tyler/Longview, TX",
    utility: "SWEPCO",
    county: "Smith County",
    defaultZip: "75701",
    zipPrefixes: ["757"],
    jobs: TYLER_JOBS,
  },
  {
    id: "lufkin",
    label: "Lufkin/East TX (Angelina County)",
    shortLabel: "Lufkin/East TX",
    utility: "Entergy Texas",
    county: "Angelina County",
    defaultZip: "75901",
    zipPrefixes: ["759"],
    jobs: LUFKIN_JOBS,
  },
  {
    id: "san-angelo",
    label: "San Angelo, TX (Tom Green County)",
    shortLabel: "San Angelo, TX",
    utility: "AEP Texas",
    county: "Tom Green County",
    defaultZip: "76901",
    zipPrefixes: ["769"],
    jobs: SAN_ANGELO_JOBS,
  },
  {
    id: "laredo",
    label: "Laredo, TX (Webb County)",
    shortLabel: "Laredo, TX",
    utility: "AEP Texas",
    county: "Webb County",
    defaultZip: "78040",
    zipPrefixes: ["7804"],
    jobs: LAREDO_JOBS,
  },
  // ── Louisiana ─────────────────────────────────────────────────────
  {
    id: "shreveport",
    label: "Shreveport/Bossier City, LA (Caddo Parish)",
    shortLabel: "Shreveport, LA",
    utility: "SWEPCO",
    county: "Caddo Parish",
    defaultZip: "71106",
    zipPrefixes: ["711", "710"],
    jobs: SHREVEPORT_JOBS,
  },
  {
    id: "monroe-la",
    label: "Monroe/West Monroe, LA (Ouachita Parish)",
    shortLabel: "Monroe, LA",
    utility: "Entergy Louisiana",
    county: "Ouachita Parish",
    defaultZip: "71203",
    zipPrefixes: ["712"],
    jobs: MONROE_JOBS,
  },
  {
    id: "alexandria-la",
    label: "Alexandria/Central LA (Rapides Parish)",
    shortLabel: "Alexandria, LA",
    utility: "CLECO / Entergy Louisiana",
    county: "Rapides Parish",
    defaultZip: "71302",
    zipPrefixes: ["713", "714"],
    jobs: ALEXANDRIA_LA_JOBS,
  },
  {
    id: "lafayette",
    label: "Lafayette, LA (Lafayette Parish)",
    shortLabel: "Lafayette, LA",
    utility: "Entergy Louisiana / LUS",
    county: "Lafayette Parish",
    defaultZip: "70507",
    zipPrefixes: ["705", "704"],
    jobs: LAFAYETTE_JOBS,
  },
  {
    id: "lake-charles",
    label: "Lake Charles/Sulphur, LA (Calcasieu Parish)",
    shortLabel: "Lake Charles, LA",
    utility: "Entergy Louisiana",
    county: "Calcasieu Parish",
    defaultZip: "70601",
    zipPrefixes: ["706", "707"],
    jobs: LAKE_CHARLES_JOBS,
  },
  {
    id: "baton-rouge",
    label: "Baton Rouge, LA (East Baton Rouge Parish)",
    shortLabel: "Baton Rouge, LA",
    utility: "Entergy Louisiana",
    county: "East Baton Rouge Parish",
    defaultZip: "70816",
    zipPrefixes: ["708", "709"],
    jobs: BATON_ROUGE_JOBS,
  },
  {
    id: "new-orleans",
    label: "New Orleans, LA (Orleans Parish)",
    shortLabel: "New Orleans, LA",
    utility: "Entergy New Orleans",
    county: "Orleans Parish",
    defaultZip: "70123",
    zipPrefixes: ["700", "701", "703"],
    jobs: NEW_ORLEANS_JOBS,
  },
  // ── Oklahoma ───────────────────────────────────────────────────────
  {
    id: "oklahoma-city",
    label: "Oklahoma City, OK (Oklahoma County)",
    shortLabel: "Oklahoma City, OK",
    utility: "OG&E (Oklahoma Gas & Electric)",
    county: "Oklahoma County",
    defaultZip: "73108",
    zipPrefixes: ["730", "731", "733", "734"],
    jobs: OKC_JOBS,
  },
  {
    id: "tulsa",
    label: "Tulsa, OK (Tulsa County)",
    shortLabel: "Tulsa, OK",
    utility: "PSO (AEP Oklahoma)",
    county: "Tulsa County",
    defaultZip: "74129",
    zipPrefixes: ["740", "741", "743", "744"],
    jobs: TULSA_JOBS,
  },
  {
    id: "lawton",
    label: "Lawton, OK (Comanche County)",
    shortLabel: "Lawton, OK",
    utility: "PSO / OG&E",
    county: "Comanche County",
    defaultZip: "73501",
    zipPrefixes: ["735"],
    jobs: LAWTON_JOBS,
  },
  // ── Arkansas ──────────────────────────────────────────────────────
  {
    id: "little-rock",
    label: "Little Rock, AR (Pulaski County)",
    shortLabel: "Little Rock, AR",
    utility: "Entergy Arkansas",
    county: "Pulaski County",
    defaultZip: "72209",
    zipPrefixes: ["720", "721", "722"],
    jobs: LITTLE_ROCK_JOBS,
  },
  {
    id: "fort-smith",
    label: "Fort Smith, AR (Sebastian County)",
    shortLabel: "Fort Smith, AR",
    utility: "OG&E / AEP SWEPCO",
    county: "Sebastian County",
    defaultZip: "72901",
    zipPrefixes: ["729", "728"],
    jobs: FORT_SMITH_JOBS,
  },
  {
    id: "springdale",
    label: "Springdale/NW Arkansas (Washington County)",
    shortLabel: "NW Arkansas",
    utility: "OG&E / SWEPCO / Carroll Electric",
    county: "Washington County",
    defaultZip: "72762",
    zipPrefixes: ["727", "726"],
    jobs: SPRINGDALE_JOBS,
  },
];

export const DEFAULT_JURISDICTION = JURISDICTIONS[0]; // Austin

export function getJurisdictionById(id: string): Jurisdiction | undefined {
  return JURISDICTIONS.find((j) => j.id === id);
}

export function getJurisdictionByZip(zip: string): Jurisdiction {
  for (const j of JURISDICTIONS) {
    if (j.zipPrefixes.some((p) => zip.startsWith(p))) return j;
  }
  return DEFAULT_JURISDICTION;
}

export function getJobForJurisdiction(
  jurisdictionId: string,
  jobId: string,
): Job | undefined {
  const jur = getJurisdictionById(jurisdictionId);
  if (!jur) return undefined;
  return jur.jobs.find((j) => j.id === jobId);
}
