/**
 * Re-export from trades/electrical — material classification now lives there.
 * This shim keeps existing "@/lib/data/material-groups" imports working.
 */
export type { MaterialGroupId, MaterialGroup } from "../trades/electrical/material-classifier";
export { groupMaterials } from "../trades/electrical/material-classifier";
