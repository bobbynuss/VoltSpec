/**
 * Re-export from trades/electrical — panel system now lives there.
 * This shim keeps existing "@/lib/data/panel-overrides" imports working.
 */
export type { PanelTypeId, PanelTypeOption } from "../trades/electrical/panel-system";
export {
  PANEL_TYPE_OPTIONS,
  PANEL_ELIGIBLE_JOBS,
  getDefaultPanelType,
  applyPanelOverride,
} from "../trades/electrical/panel-system";
