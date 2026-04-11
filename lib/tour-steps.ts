import type { TourStep } from "@/components/TourOverlay";

/**
 * Tour steps for the interactive walkthrough.
 * Each step's `target` matches a `data-tour="..."` attribute in the UI.
 * `beforeShow` callbacks are injected at runtime by the app page.
 *
 * Updated April 11, 2026: 74 jurisdictions, 14 states, Quick List, AI Takeoff
 */

export const TOUR_STEPS: Omit<TourStep, "beforeShow">[] = [
  {
    id: "search",
    target: "search-bar",
    title: "Search Bar — Find Anything Fast",
    body: "Type any city, utility name, or job type to instantly filter results. VoltSpec covers 74 jurisdictions across 14 states — from Austin to Atlanta, Phoenix to Charlotte. Use the state filter dropdown to narrow by state, or just search.",
  },
  {
    id: "city",
    target: "city-selector",
    title: "City / Jurisdiction",
    body: "Pick your city from the dropdown. VoltSpec loads the correct utility rules, panel series (Eaton CH, BR, or others), meter socket requirements, and local pricing for that jurisdiction. Enter your ZIP code below and the nearest Elliott branch auto-populates.",
  },
  {
    id: "job-type",
    target: "job-type-selector",
    title: "29 Job Types",
    body: "Choose from 29 job types — residential services (200A, 320A, 400A), subpanels, EV chargers, generators, solar PV, battery storage, pool/spa, landscape lighting, commercial 3-phase, and a full 7-phase Data Center Build-Out series. Each comes with a complete NEC 2026 materials list, requirements, and schematic.",
  },
  {
    id: "generate",
    target: "generate-btn",
    title: "Generate Full Package",
    body: "Hit this button and VoltSpec builds everything in one shot: NEC 2026 requirements, a complete bill of materials with real Elliott Electric part numbers and vendor codes, an SVG schematic blueprint, your nearest Elliott branch, and official code/utility docs.",
  },
  {
    id: "materials",
    target: "group-panel-breakers",
    title: "Smart Material Grouping",
    body: "Materials auto-group into sections: Gear (commercial), Panels & Breakers, Wire, Conduit & Raceway, Devices & Lighting, Fittings, and Misc. Every item has a direct Elliott Product link and Search link. Use the Panel Type selector to swap between CH, BR, Pow-R-Line, SPAN, or MBT combo — materials update instantly.",
  },
  {
    id: "save",
    target: "save-btn",
    title: "Save to the Cloud",
    body: "Sign up (free) and save jobs to your account. Click Save Job, give it a name, and it's stored. Re-open any saved project from the Projects panel in the top nav. Works across devices.",
  },
  {
    id: "quote",
    target: "quote-btn",
    title: "Quote Request to Elliott",
    body: "Sends your full BOM directly to your Elliott sales rep — vendor codes, part numbers, quantities, all formatted and ready. The email auto-CCs the rep based on your profile. No more re-typing orders.",
  },
  {
    id: "jobsheet",
    target: "jobsheet-btn",
    title: "One-Page Job Sheet",
    body: "The Job Sheet is a condensed one-page PDF you can print and bring to the job site — job name, requirements summary, materials list, and key notes all on one page.",
  },
  {
    id: "export",
    target: "pdf-btn",
    title: "Full PDF Package",
    body: "The PDF Package generates a professional multi-page document: cover page, NEC requirements, materials table with pricing, schematic blueprint, and supplier info. Toggle the estimated pricing column on or off before exporting.",
  },
];
