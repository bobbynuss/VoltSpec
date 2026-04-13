import { supabase } from "./supabase";

export type EventType =
  | "generate"
  | "pdf_export"
  | "jobsheet_export"
  | "share_created"
  | "share_viewed"
  | "signup"
  | "upgrade";

interface TrackEventOptions {
  userId?: string;
  city?: string;
  jobId?: string;
  jobLabel?: string;
  meta?: Record<string, string>;
}

/**
 * Fire-and-forget event tracking. Never throws.
 */
export function trackEvent(event: EventType, opts: TrackEventOptions = {}) {
  try {
    supabase
      .from("usage_events")
      .insert({
        event,
        user_id: opts.userId ?? null,
        city: opts.city ?? null,
        job_id: opts.jobId ?? null,
        job_label: opts.jobLabel ?? null,
        meta: opts.meta ?? null,
      })
      .then(({ error }) => {
        if (error) console.warn("[analytics] Insert failed:", error.message);
      });
  } catch {
    // never block the UI
  }
}
