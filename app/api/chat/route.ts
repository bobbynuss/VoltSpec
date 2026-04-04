import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        {
          reply:
            "AI chat requires an ANTHROPIC_API_KEY environment variable. Add it to your .env.local file to enable this feature.",
        },
        { status: 200 }
      );
    }

    const systemPrompt = `You are VoltSpec AI, an expert electrical code assistant specializing in NEC 2026, Austin Energy requirements, and Texas electrical installations. 

You help electricians, contractors, and inspectors understand:
- NEC 2026 code requirements and interpretations
- Austin Energy utility requirements and design criteria
- Material sizing and selection
- Austin/Travis County permit requirements
- Best practices for residential and commercial installations

${context ? `Current job context: ${context}` : ""}

IMPORTANT DISCLAIMER: Always remind users that your answers are for reference only and they must verify all requirements with the local AHJ (Authority Having Jurisdiction) before any installation. You are not a licensed engineer.

Be concise, practical, and use the language electricians use in the field. Use article/section references when citing NEC.`;

    const response = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: message }],
    });

    const reply =
      response.content[0].type === "text" ? response.content[0].text : "Unable to get response.";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
