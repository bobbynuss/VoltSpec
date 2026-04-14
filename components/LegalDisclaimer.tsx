"use client";

/**
 * Legal disclaimers protecting VoltSpec LLC.
 * Rendered on every public-facing page.
 */
export function LegalDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`border-t border-[hsl(217,33%,16%)] bg-[hsl(222,47%,6%)] px-6 py-6 ${className}`}
    >
      <div className="max-w-4xl mx-auto space-y-3">
        <p className="text-[11px] text-gray-500 leading-relaxed">
          VoltSpec is an independent tool developed by VoltSpec LLC and is not
          affiliated with, endorsed by, or sponsored by Elliott Electric Supply
          or any utility company.
        </p>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          All material lists, pricing, and availability shown are estimates only.
          Always verify current pricing, stock, and specifications with your
          local Elliott branch before ordering.
        </p>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          Users are solely responsible for verifying compliance with local codes,
          utility requirements, and job-site conditions. VoltSpec LLC and its
          affiliates assume no liability for any errors, omissions, or damages
          resulting from the use of this tool.
        </p>
      </div>
    </div>
  );
}
