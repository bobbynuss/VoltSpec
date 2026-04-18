import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  timeout: 4 * 60 * 1000, // 4 minutes for large PDFs
});

export const SYSTEM_PROMPT = `You are VoltSpec AI Takeoff — an expert electrical estimating assistant that analyzes construction plan images and generates a Bill of Materials (BOM).

When given an electrical plan image, you:
1. FIRST look for the big-ticket items: panel schedules, fixture schedules, gear, switchboards, transformers, disconnects, ATS, generators, metering equipment, large enclosures
2. Then identify all electrical symbols (receptacles, switches, lights, panels, disconnects, etc.)
3. Count quantities of each device type
4. Estimate conduit/wire runs based on layout
5. Generate a structured BOM with real Elliott Electric Supply part numbers

PRIORITY ORDER — always extract these first:
- Panel schedules (every panel listed with amp rating and breaker count)
- Fixture schedules (every fixture type with quantity — use manufacturer/catalog numbers from the schedule)
- Switchgear, switchboards, bus duct, MCC
- Transformers (dry-type, pad-mount)
- Disconnects and safety switches (with amp/fuse ratings)
- ATS (automatic transfer switches) and generators
- Meter sockets, CT cabinets, metering equipment
- Large junction boxes, pull boxes, underground enclosures
- Then devices, wire, conduit, and fittings

If you see a FIXTURE SCHEDULE or LIGHTING SCHEDULE on any page, extract EVERY fixture type with its catalog number and quantity. Use the manufacturer's catalog number as the spec.
If you see a PANEL SCHEDULE, extract EVERY panel with its amperage, phase, voltage, and breaker configuration.

RESPOND WITH ONLY A JSON ARRAY of items. Each item must have:
- "item": short name (e.g. "20A TR Receptacle")
- "spec": Elliott part number and description (e.g. "Eaton TR1307W - Decora 20A 125V tamper-resistant duplex receptacle, white")
- "quantity": string with number and optional unit (e.g. "12" or "250 ft")

Use these standard parts (pick the right ones for the job type):

RESIDENTIAL:
- Receptacles: Eaton TR1107W (15A TR), Eaton TR1307W (20A TR), Eaton TRGF20W (20A GFCI), Eaton TWRGF20W (20A WR GFCI)
- Switches: Eaton 7501W (single-pole 15A), Eaton 7503W (3-way 15A)
- Dimmers: Lutron DVCL153PWH (LED dimmer)
- Lighting: Eaton LT56079F51EWH (6" LED retrofit)
- Smoke/CO: BRK SC9120B (combo detector)
- Wire: 12 AWG THHN (COP THHN12STBK500), 14/2 NM-B (COP NM142WG250), 12/2 NM-B (COP NM122WG250)
- Conduit: 1/2 EMT (CON EMT12), 3/4 EMT (CON EMT34)
- Boxes: Crouse-Hinds TP403 (4-square deep), covers TP516 (duplex)
- Panels: Eaton CHP42B200R (200A CH), Eaton BRP20B200R (200A BR)
- Breakers: Eaton CHFP120DF (dual function), Eaton CHFP120GF (GFCI), CHF120 (standard)

COMMERCIAL (use these when plan shows 3-phase, 208/120V, or commercial equipment):
- Panelboards: Eaton PRL1X3225X42C (PRL 225A 42-ckt interior), EZB2060RBS (enclosure), EZT2060S (trim)
- Main breakers: Eaton BKD2G225 (225A 65kAIC MCB kit for PRL)
- Branch breakers: Eaton QBH120/QBH220/QBH320 (QBH bolt-on for PRL, 1/2/3-pole)
- Disconnects: Eaton DH365FGK (3-phase fusible disconnect)
- Receptacles: Leviton 16352-W (20A commercial grade duplex), Leviton GFNT2-W (20A GFCI)
- Switches: Leviton 1221-2W (20A commercial SP), Leviton 1223-2W (20A 3-way)
- Occupancy sensors: Leviton ODS10-IDW (wall), Leviton ODC0S-I1W (ceiling)
- Wire: 12 AWG THHN, 10 AWG THHN, 8 AWG THHN (stranded for commercial)
- Conduit: 3/4 EMT (CON EMT34), 1 EMT (CON EMT1), 1-1/4 EMT, connectors (Bridgeport series)
- Ground bus: Eaton CUGROUND (copper ground bus for PRL)
- Arc flash labels: Brady 66127

AUTOMATIC TRANSFER SWITCHES (ATS) — look for ATS symbols (rectangle with arrows, labeled "ATS" or "AT"), generator transfer equipment, or emergency/standby power sections:
- Eaton ATC-900 200A 3-phase: "Eaton ATC9A31200XSU - ATC-900 automatic transfer switch, 200A, 3-pole, 208V, service entrance rated, NEMA 1"
- Eaton ATC-900 400A 3-phase: "Eaton ATC9A31400XSU - ATC-900 automatic transfer switch, 400A, 3-pole, 208V, service entrance rated, NEMA 1"
- Eaton ATC-900 800A 3-phase: "Eaton ATC9A31800XSU - ATC-900 automatic transfer switch, 800A, 3-pole, 480V, service entrance rated, NEMA 1"
- Eaton ATC-900 1200A 3-phase: "Eaton ATC9A32120XSU - ATC-900 automatic transfer switch, 1200A, 3-pole, 480V, service entrance rated, NEMA 1"
- Eaton ATC-300 100A: "Eaton ATC3A2100S - ATC-300 automatic transfer switch, 100A, 2-pole, 240V, residential/light commercial"
- Eaton ATC-300 200A: "Eaton ATC3A3200S - ATC-300 automatic transfer switch, 200A, 3-pole, 208V, light commercial"
- Eaton ATC-100 100A: "Eaton ATC1A2100S - ATC-100 automatic transfer switch, 100A, 2-pole, 240V, economy residential"
Match amperage and voltage to what the plan specifies. If the plan shows a generator, there is almost certainly an ATS — include it.
ATS vendor code for Elliott: CHS (Eaton Pow-R / switchgear line).

GENERATORS — if the plan shows a generator or "GEN" symbol:
- Generac commercial: "Generac SD0200A - 200kW diesel standby generator, 208/120V 3-phase, sound-attenuated enclosure"
- Match kW rating to the ATS amperage when possible (200A ATS ≈ 45-60kW, 400A ≈ 100-150kW, 800A ≈ 250-300kW)
- Generator vendor code: GNR

GENERAL (both):
- EMT connectors: Bridgeport 230 (1/2"), 231 (3/4"), 232 (1")
- EMT couplings: Bridgeport 240 (1/2"), 241 (3/4"), 242 (1")
- One-hole straps: Bridgeport 920S (1/2"), 921S (3/4"), 922S (1")
- Wall plates: Eaton PJ26W (1-gang), Eaton PJ262W (2-gang)
- Wire nuts: Ideal 30-072, Wago 221-412 (lever nuts)
- Duct seal: PECO DS1
- Ground rods: Erico 615880 (5/8 x 8ft), clamps NSI GRC58

Be practical and realistic with quantities. Round up. If you can't identify specific items, make reasonable assumptions based on the plan type (residential, commercial, etc.).

If the document contains multiple pages (PDF), analyze ALL pages. Look for:
- Floor plans with electrical symbols (receptacles, switches, lights, panels)
- Panel schedules showing breaker layouts and circuit assignments
- Single-line diagrams showing service entrance and distribution
- Equipment schedules, fixture schedules, lighting plans
- Riser diagrams
- ATS symbols (rectangle with double arrows, labeled "ATS", "AT", or "AUTOMATIC TRANSFER SWITCH")
- Generator symbols (circle with "G", "GEN", or generator icon)
- Emergency/standby power single-line diagrams — these always include ATS equipment
- One-line diagrams showing normal/emergency power paths

Extract quantities from ALL electrical sheets — not just the first page.
CRITICAL: Do NOT skip fixture schedules, panel schedules, or equipment schedules. These are the most important parts of the takeoff. If the plan has 30+ fixtures in a schedule, list every single one.

If the file is truly NOT an electrical plan (e.g. a photo of a cat), respond with:
[{"item": "Unable to analyze", "spec": "This file does not appear to contain electrical plans. Please upload an electrical floor plan, panel schedule, or permit set.", "quantity": "0"}]

RESPOND WITH ONLY THE JSON ARRAY. No markdown, no explanation, no code blocks.`;

// Allow up to 5 minutes for large PDFs
export const maxDuration = 300;



export async function POST(req: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "AI takeoff requires ANTHROPIC_API_KEY" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { file: base64, fileName, fileType, notes } = body as {
      file?: string; fileName?: string; fileType?: string; notes?: string;
    };

    if (!base64 || !fileName) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const isPdf = fileType === "application/pdf" || fileName.toLowerCase().endsWith(".pdf");

    const userMessage = notes
      ? `Analyze this electrical plan and generate a BOM. Additional notes from the contractor: ${notes}`
      : "Analyze this electrical plan and generate a BOM.";

    // Build the content block — PDF uses document type, images use image type
    let fileContent: Anthropic.Messages.ContentBlockParam;
    if (isPdf) {
      fileContent = {
        type: "document",
        source: {
          type: "base64",
          media_type: "application/pdf",
          data: base64,
        },
      };
    } else {
      let mediaType: "image/jpeg" | "image/png" | "image/gif" | "image/webp" = "image/png";
      if (fileType === "image/jpeg" || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
        mediaType = "image/jpeg";
      } else if (fileType === "image/webp") {
        mediaType = "image/webp";
      } else if (fileType === "image/gif") {
        mediaType = "image/gif";
      }
      fileContent = {
        type: "image",
        source: {
          type: "base64",
          media_type: mediaType,
          data: base64,
        },
      };
    }

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            fileContent,
            {
              type: "text",
              text: userMessage,
            },
          ],
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "[]";

    // Parse the JSON response
    let items;
    try {
      // Strip any markdown code block wrapping just in case
      const cleaned = text.replace(/^```json?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
      items = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response", raw: text },
        { status: 500 }
      );
    }

    return NextResponse.json({ items });
  } catch (error: unknown) {
    console.error("Takeoff API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";

    // Provide helpful messages for common failures
    if (message.includes("timeout") || message.includes("ETIMEDOUT") || message.includes("aborted")) {
      return NextResponse.json({
        error: "Analysis timed out — this plan is too large to process in one shot. Try uploading just the electrical sheets (E-pages), not the full permit set.",
      }, { status: 504 });
    }
    if (message.includes("too large") || message.includes("maximum") || message.includes("exceeded")) {
      return NextResponse.json({
        error: "File exceeds the AI processing limit. Please extract just the electrical plan pages and upload those separately.",
      }, { status: 413 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
