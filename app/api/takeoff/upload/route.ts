import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

/**
 * Chunked upload endpoint for large files that exceed Vercel's 4.5MB body limit.
 *
 * Flow:
 *   POST  → initialize upload, get uploadId
 *   PUT   → send base64 chunks
 *   PATCH → assemble chunks and run AI analysis
 *
 * Chunks are stored in memory (Map) — fine for single-user serverless.
 * Each upload auto-expires after 10 minutes.
 */

export const maxDuration = 300;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  timeout: 4 * 60 * 1000,
});

// In-memory chunk storage (works in serverless because all requests hit same instance during upload)
// For production scale, use Vercel Blob or Supabase Storage
const uploads = new Map<string, {
  fileName: string;
  fileType: string;
  notes?: string;
  chunks: Map<number, string>;
  createdAt: number;
}>();

// Clean up old uploads
function cleanup() {
  const now = Date.now();
  for (const [id, upload] of uploads) {
    if (now - upload.createdAt > 10 * 60 * 1000) uploads.delete(id);
  }
}

// POST — initialize
export async function POST(req: NextRequest) {
  cleanup();
  const { fileName, fileType, fileSize, notes } = await req.json();
  const uploadId = crypto.randomUUID();
  uploads.set(uploadId, {
    fileName, fileType, notes,
    chunks: new Map(),
    createdAt: Date.now(),
  });
  return NextResponse.json({ uploadId });
}

// PUT — receive chunk
export async function PUT(req: NextRequest) {
  const { uploadId, chunkIndex, chunk } = await req.json();
  const upload = uploads.get(uploadId);
  if (!upload) return NextResponse.json({ error: "Upload not found or expired" }, { status: 404 });
  upload.chunks.set(chunkIndex, chunk);
  return NextResponse.json({ ok: true, received: chunkIndex });
}

// PATCH — assemble and process
export async function PATCH(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "AI takeoff requires ANTHROPIC_API_KEY" }, { status: 500 });
  }

  const { uploadId, totalChunks } = await req.json();
  const upload = uploads.get(uploadId);
  if (!upload) return NextResponse.json({ error: "Upload not found or expired" }, { status: 404 });

  // Assemble base64
  const parts: string[] = [];
  for (let i = 0; i < totalChunks; i++) {
    const chunk = upload.chunks.get(i);
    if (!chunk) return NextResponse.json({ error: `Missing chunk ${i}` }, { status: 400 });
    parts.push(chunk);
  }
  const base64 = parts.join("");
  uploads.delete(uploadId); // Free memory

  const { fileName, fileType, notes } = upload;
  const isPdf = fileType === "application/pdf" || fileName.toLowerCase().endsWith(".pdf");

  const userMessage = notes
    ? `Analyze this electrical plan and generate a BOM. Additional notes from the contractor: ${notes}`
    : "Analyze this electrical plan and generate a BOM.";

  // Import the system prompt from the main route
  const SYSTEM_PROMPT = (await import("../route")).SYSTEM_PROMPT;

  let fileContent: Anthropic.Messages.ContentBlockParam;
  if (isPdf) {
    fileContent = {
      type: "document",
      source: { type: "base64", media_type: "application/pdf", data: base64 },
    };
  } else {
    let mediaType: "image/jpeg" | "image/png" | "image/gif" | "image/webp" = "image/png";
    if (fileType === "image/jpeg" || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) mediaType = "image/jpeg";
    else if (fileType === "image/webp") mediaType = "image/webp";
    else if (fileType === "image/gif") mediaType = "image/gif";
    fileContent = {
      type: "image",
      source: { type: "base64", media_type: mediaType, data: base64 },
    };
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: [fileContent, { type: "text", text: userMessage }] }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "[]";
    const cleaned = text.replace(/^```json?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
    const items = JSON.parse(cleaned);
    return NextResponse.json({ items });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    if (message.includes("timeout") || message.includes("aborted")) {
      return NextResponse.json({
        error: "Analysis timed out. Try uploading fewer pages.",
      }, { status: 504 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
