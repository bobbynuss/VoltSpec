# ⚡ VoltSpec

**Professional NEC 2026 Electrical Code & Job Package Generator for Electricians**

VoltSpec is a Next.js 15 web app that generates complete job packages for common electrical work — including code requirements, materials lists, blueprint notes, local supplier info, and official documentation links.

Built for working electricians on Austin, TX job sites. Easily extensible to other jurisdictions.

---

## Features

- 🏗️ **13 job types** — residential, commercial, EV, solar, pool, battery storage, and more
- 📋 **NEC 2026 + Austin Energy requirements** for each job type
- 📦 **Materials lists** with realistic quantities and specifications
- 📐 **Blueprint notes** + simple SVG schematics
- 🏪 **Local suppliers** — Elliott Electric, Graybar, Rexel, and more
- 📄 **Official docs** — Austin Energy Design Criteria Manual, ESPA forms, E-1001
- 🖨️ **PDF export** — branded 3-page bid package with disclaimers
- 🤖 **AI chat** — powered by Claude, context-aware to your current job
- 📱 **Mobile-first** dark UI, contractor-friendly on job sites

---

## Quick Start

```bash
# Install dependencies (already done if you cloned this)
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Create `.env.local`:

```env
# Required for AI chat feature (get at console.anthropic.com)
ANTHROPIC_API_KEY=sk-ant-...
```

The app runs fully without the API key — AI chat will show a friendly message directing you to add it.

---

## Adding New Job Types

Edit `lib/data.ts` — add a new `JobPackage` object to the `JOB_TYPES` array:

```typescript
{
  id: "your-job-id",
  label: "Your Job Label",
  requirements: ["NEC requirement 1", "..."],
  materials: [
    { item: "Item name", quantity: "1", spec: "Specification detail" },
  ],
  blueprintNotes: ["Note 1", "Note 2"],
  svgDiagram: `<svg>...</svg>`, // optional
  suppliers: AUSTIN_SUPPLIERS, // or custom array
  officialDocs: AUSTIN_OFFICIAL_DOCS, // or custom array
}
```

## Adding New Jurisdictions

The data structure is designed for multi-jurisdiction support. Future work:

1. Add a `jurisdictions/` folder in `lib/`
2. Each jurisdiction exports its own `suppliers`, `officialDocs`, and requirement amendments
3. ZIP code lookup routes to the appropriate jurisdiction data

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Icons:** Lucide React
- **PDF:** @react-pdf/renderer
- **AI:** Anthropic Claude (claude-opus-4-5)

---

## Disclaimer

⚠️ VoltSpec is a **reference tool only**. All code requirements, material quantities, and specifications must be verified by a licensed electrical contractor or engineer familiar with local conditions. Always obtain required permits and inspections from the Authority Having Jurisdiction (AHJ) before proceeding with any electrical work.
