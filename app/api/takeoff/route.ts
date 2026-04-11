import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are VoltSpec AI Takeoff — an expert electrical estimating assistant that analyzes construction plan images and generates a Bill of Materials (BOM).

When given an electrical plan image, you:
1. Identify all electrical symbols (receptacles, switches, lights, panels, disconnects, etc.)
2. Count quantities of each device type
3. Estimate conduit/wire runs based on layout
4. Generate a structured BOM with real Elliott Electric Supply part numbers

RESPOND WITH ONLY A JSON ARRAY of items. Each item must have:
- "item": short name (e.g. "20A TR Receptacle")
- "spec": Elliott part number and description (e.g. "Eaton TR1307W - Decora 20A 125V tamper-resistant duplex receptacle, white")
- "quantity": string with number and optional unit (e.g. "12" or "250 ft")

Use these standard parts:
- Receptacles: Eaton TR1107W (15A TR), Eaton TR1307W (20A TR), Eaton TRGF20W (20A GFCI), Eaton TWRGF20W (20A WR GFCI)
- Switches: Eaton 7501W (single-pole 15A), Eaton 7503W (3-way 15A)
- Dimmers: Lutron DVCL153PWH (LED dimmer)
- Lighting: Eaton LT56079F51EWH (6" LED retrofit)
- Smoke/CO: BRK SC9120B (combo detector)
- Wire: 12 AWG THHN (COP THHN12STBK500), 14/2 NM-B (COP NM142WG250), 12/2 NM-B (COP NM122WG250)
- Conduit: 1/2 EMT (CON EMT12), 3/4 EMT (CON EMT34), connectors (Bridgeport 230, 231)
- Boxes: Crouse-Hinds TP403 (4-square deep), covers TP516 (duplex), TP512 (switch)
- Plates: Eaton PJ26W (1-gang), Eaton PJ262W (2-gang)
- Connectors: Ideal 30-072 (wire nuts), Wago 221-412 (lever nuts), Arlington NM94 (NM connectors)
- Panels: Eaton CHP42B200R (200A CH), Eaton BRP20B200R (200A BR)
- Breakers: Eaton CHFP120DF (dual function), Eaton CHFP120GF (GFCI), CHF120 (standard)

Be practical and realistic with quantities. Round up. If you can't identify specific items, make reasonable assumptions based on the plan type (residential, commercial, etc.).

If the image is NOT an electrical plan (or is unreadable), respond with:
[{"item": "Unable to analyze", "spec": "The uploaded image does not appear to be an electrical plan. Please upload a clear electrical floor plan or single-line diagram.", "quantity": "0"}]

RESPOND WITH ONLY THE JSON ARRAY. No markdown, no explanation, no code blocks.`;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "AI takeoff requires ANTHROPIC_API_KEY" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const notes = formData.get("notes") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    // Determine media type
    let mediaType: "image/jpeg" | "image/png" | "image/gif" | "image/webp" = "image/png";
    if (file.type === "image/jpeg" || file.name.endsWith(".jpg") || file.name.endsWith(".jpeg")) {
      mediaType = "image/jpeg";
    } else if (file.type === "image/webp") {
      mediaType = "image/webp";
    } else if (file.type === "image/gif") {
      mediaType = "image/gif";
    }

    const userMessage = notes
      ? `Analyze this electrical plan and generate a BOM. Additional notes from the contractor: ${notes}`
      : "Analyze this electrical plan and generate a BOM.";

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: base64,
              },
            },
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
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
