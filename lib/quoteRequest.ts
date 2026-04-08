import { supabase } from "./supabase";

export interface BOMItem {
  catalog: string;
  quantity: string;
  description: string;
  estCost: string;
}

export interface QuoteRequestPayload {
  jobName: string;
  jobId: string;
  city: string;
  zip: string;
  elliottStore: string | null;
  elliottRep: string | null;
  bom: BOMItem[];
  notes: string;
  userEmail: string;
  companyName: string | null;
  phone: string | null;
}

/** Save quote request to Supabase and send email via API route */
export async function submitQuoteRequest(payload: QuoteRequestPayload): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  // 1. Log the quote request
  const { error: dbErr } = await supabase.from("quote_requests").insert({
    user_id: user.id,
    job_name: payload.jobName,
    job_id: payload.jobId,
    city: payload.city,
    zip: payload.zip,
    elliott_store: payload.elliottStore,
    elliott_rep: payload.elliottRep,
    bom_data: payload.bom,
    notes: payload.notes,
  });
  if (dbErr) throw new Error(dbErr.message);

  // 2. Send the email via server-side API route
  const res = await fetch("/api/quote-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const resBody = await res.json().catch(() => null);

  if (!res.ok || !resBody?.ok) {
    const errMsg = resBody?.error || `Email failed (HTTP ${res.status})`;
    throw new Error(errMsg);
  }
}
