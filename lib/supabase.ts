/**
 * Re-export from core — Supabase client now lives in lib/core/supabase.ts.
 * This shim keeps existing "@/lib/supabase" imports working.
 */
export { supabase } from "./core/supabase";
