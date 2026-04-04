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
import { CORPUS_JOBS } from "./corpus/jobs";
import { ABILENE_JOBS } from "./abilene/jobs";
import { ODESSA_JOBS } from "./odessa/jobs";

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
    id: "corpus",
    label: "Corpus Christi, TX (Nueces County)",
    shortLabel: "Corpus Christi, TX",
    utility: "AEP Texas Central",
    county: "Nueces County",
    defaultZip: "78401",
    zipPrefixes: ["784", "783"],
    jobs: CORPUS_JOBS,
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
