import type { TourStep } from "@/components/TourOverlay";

/**
 * Tour steps for the interactive walkthrough.
 * Each step's `target` matches a `data-tour="..."` attribute in the UI.
 * `beforeShow` callbacks are injected at runtime by the app page.
 */

export const TOUR_STEPS: Omit<TourStep, "beforeShow">[] = [
  {
    id: "city",
    target: "city-selector",
    title: "Choose Your City",
    body: "Pick your city or jurisdiction from this dropdown. VoltSpec loads the correct utility, panel series (CH or BR), and local pricing for that area.",
  },
  {
    id: "job-type",
    target: "job-type-selector",
    title: "Select a Job Type",
    body: "Choose from 20+ job types \u2014 everything from 200A upgrades to EV chargers to the new Residential Final Trim-Out. Each comes with a full NEC 2026 materials list.",
  },
  {
    id: "generate",
    target: "generate-btn",
    title: "Generate the Package",
    body: "Hit this button and VoltSpec builds your complete job package: requirements, bill of materials with Elliott part numbers, schematic blueprint, supplier contacts, and official docs.",
  },
  {
    id: "save",
    target: "save-btn",
    title: "Save to the Cloud",
    body: "Sign up (free) and save jobs to your account. Click Save Job, name it, and it\u2019s stored. Re-open any saved project from the Projects panel.",
  },
  {
    id: "quote",
    target: "quote-btn",
    title: "Send a Quote Request",
    body: "This sends your full BOM to your email \u2014 vendor codes, part numbers, quantities \u2014 with a Bulk Entry section you can paste straight into Elliott\u2019s Rapid Order pad.",
  },
  {
    id: "export",
    target: "pdf-btn",
    title: "Export PDF or Job Sheet",
    body: "PDF Package generates a multi-page professional document. Job Sheet is a one-page condensed version. Both include your logo, requirements, materials, and blueprint.",
  },
  {
    id: "devices",
    target: "group-devices-lighting",
    title: "Devices & Lighting",
    body: "The Materials tab auto-groups items. This section collects all switches, receptacles, GFCI, dimmers, wall plates, smoke detectors, and LED fixtures \u2014 each with the correct Elliott vendor code.",
  },
];
