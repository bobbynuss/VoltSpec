"use client";

import { AlertTriangle } from "lucide-react";

/**
 * Persistent disclaimer banner — used on every app page.
 * Compact but clearly visible. Yellow/amber warning style.
 */
export function DisclaimerBanner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-2.5 px-4 py-2.5 bg-amber-950/40 border-b border-amber-800/30 text-amber-200 ${className}`}
    >
      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
      <p className="text-xs sm:text-[13px] font-medium leading-snug">
        <strong className="text-amber-300">Reference tool only</strong> — not engineering
        advice. Always verify with your local AHJ before installation.
      </p>
    </div>
  );
}
