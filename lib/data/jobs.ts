import type { Job } from "./types";
import { job as new_200a_residential } from "./jobs/new-200a-residential";
import { job as upgrade_200a } from "./jobs/200a-upgrade";
import { job as new_400a_service } from "./jobs/new-400a-service";
import { job as ev_charger_50a } from "./jobs/ev-charger-50a";
import { job as subpanel_100a } from "./jobs/100a-subpanel";
import { job as generator_ats } from "./jobs/generator-ats";
import { job as solar_pv_20kw } from "./jobs/solar-pv-20kw";
import { job as temp_power_pole } from "./jobs/temp-power-pole";
import { job as pool_electrical } from "./jobs/pool-electrical";
import { job as hot_tub_spa } from "./jobs/hot-tub-spa";
import { job as battery_storage } from "./jobs/battery-storage";
import { job as commercial_3phase_200a } from "./jobs/commercial-3phase-200a";
import { job as landscape_lighting } from "./jobs/landscape-lighting";
import { job as detached_garage_subpanel } from "./jobs/detached-garage-subpanel";
import { job as ev_charger_80a } from "./jobs/ev-charger-80a";
import { job as new_320a_service } from "./jobs/new-320a-service";
import { job as meter_base_replacement } from "./jobs/meter-base-replacement";
import { job as commercial_400a_3phase } from "./jobs/commercial-400a-3phase";
import { job as whole_house_battery_solar } from "./jobs/whole-house-battery-solar";

export const JOBS: Job[] = [
  new_200a_residential,
  upgrade_200a,
  new_320a_service,
  new_400a_service,
  ev_charger_50a,
  ev_charger_80a,
  subpanel_100a,
  detached_garage_subpanel,
  meter_base_replacement,
  generator_ats,
  solar_pv_20kw,
  temp_power_pole,
  pool_electrical,
  hot_tub_spa,
  battery_storage,
  whole_house_battery_solar,
  commercial_3phase_200a,
  commercial_400a_3phase,
  landscape_lighting,
];

export const JOB_TYPES: { id: string; label: string }[] = JOBS.map((j) => ({
  id: j.id,
  label: j.label,
}));

export function getJobById(id: string): Job | undefined {
  return JOBS.find((j) => j.id === id);
}
