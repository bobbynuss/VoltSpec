"use client";

import { AlertTriangle } from "lucide-react";

/**
 * Subtle persistent disclaimer — visible but not dominating.
 */
export function DisclaimerBanner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-1.5 px-4 py-1.5 bg-[hsl(222,47%,8%)] border-b border-[hsl(217,33%,16%)] ${className}`}
    >
      <AlertTriangle className="w-3 h-3 shrink-0 text-gray-500" />
      <p className="text-[11px] text-gray-500">
        Reference tool only — not engineering advice. Verify with your local AHJ before installation.
      </p>
    </div>
  );
}
