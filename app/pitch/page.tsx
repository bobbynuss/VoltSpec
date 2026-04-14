import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "VoltSpec — Partnership Overview",
  description: "VoltSpec partnership overview for Elliott Electric Supply.",
  robots: { index: false, follow: false },
};

export default function PitchPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 print:bg-white">
      {/* Top accent bar */}
      <div className="h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500" />

      <div className="max-w-3xl mx-auto px-8 py-10 print:py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Volt<span className="text-yellow-500">Spec</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Electrical Estimating &mdash; Built for Elliott
            </p>
          </div>
          <div className="text-right text-sm text-gray-400">
            <p>Confidential</p>
            <p>April 2026</p>
          </div>
        </div>

        {/* About Bob */}
        <section className="mb-8">
          <SectionLabel>Background</SectionLabel>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <p className="text-sm leading-relaxed text-gray-700">
              VoltSpec is built by <strong className="text-gray-900">Bob Nuss</strong> &mdash;
              a <strong className="text-gray-900">16-year Elliott Electric Supply veteran</strong>.
              7 years in counter/inside sales, nearly 10 as an area operations manager.
              Bob knows Elliott&rsquo;s systems, catalog, pricing structure, and branch operations
              from the inside out. VoltSpec was built with that institutional knowledge.
            </p>
          </div>
        </section>

        {/* What is VoltSpec */}
        <section className="mb-8">
          <SectionLabel>What VoltSpec Does</SectionLabel>
          <p className="text-sm leading-relaxed text-gray-700 mb-4">
            VoltSpec is a web-based electrical estimating tool that generates
            complete job packages &mdash; materials lists, NEC code requirements,
            SVG blueprints, and professional PDFs &mdash; in seconds. Every material
            line item includes <strong>real Elliott part numbers, vendor codes, and
            branch-specific details</strong>.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard number="60" label="Job Types" />
            <StatCard number="74" label="Jurisdictions" />
            <StatCard number="14" label="States" />
            <StatCard number="204" label="Elliott Branches" />
          </div>
        </section>

        {/* Why Elliott */}
        <section className="mb-8">
          <SectionLabel>Why This Matters for Elliott</SectionLabel>
          <div className="space-y-3">
            <BulletPoint
              title="Drives ordering directly to Elliott"
              text="Every job package lists Elliott part numbers, branch phone numbers, and links to Elliott's online ordering. Contractors can call their local branch and read part numbers straight from the PDF."
            />
            <BulletPoint
              title="100% branch coverage — already built"
              text="All 204 Elliott Electric branches are mapped. ZIP code auto-detects the nearest branch with address, phone, and hours. No contractor has to look anything up."
            />
            <BulletPoint
              title="Bulk Entry integration"
              text="Materials lists are formatted for direct paste into Elliott's Bulk Entry system. One click from estimate to order."
            />
            <BulletPoint
              title="Contractor lock-in through quality"
              text="Contractors who use VoltSpec to spec jobs will default to Elliott for materials. It's the only estimating tool on the market with real Elliott part numbers."
            />
            <BulletPoint
              title="Sales rep distribution channel"
              text="Built-in invite code system lets Elliott sales reps give contractors access. Rep tracking is already built — every signup tied back to the rep who shared it."
            />
          </div>
        </section>

        {/* Capabilities */}
        <section className="mb-8">
          <SectionLabel>Capabilities</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <CapItem label="Residential" detail="Services, subpanels, EV, solar, generators, pools, SPAN, battery storage" />
            <CapItem label="Commercial" detail="3-phase, tenant finish-out, restaurant, retail, warehouse, fire alarm, car wash" />
            <CapItem label="New Home Build" detail="5-phase: service entrance → rough-in → trim → final inspection" />
            <CapItem label="Multifamily" detail="7-phase: temp power through trim & commissioning" />
            <CapItem label="Hotel" detail="7-phase: temp power through trim & commissioning" />
            <CapItem label="Data Center" detail="7-phase: temp power through structured cabling & commissioning" />
            <CapItem label="AI Plan Takeoff" detail="Upload an electrical plan image → AI generates a BOM with Elliott parts" />
            <CapItem label="PDF Exports" detail="Professional job packages, one-page truck sheets, toggleable pricing" />
          </div>
        </section>

        {/* The Ask */}
        <section className="mb-8">
          <SectionLabel>The Opportunity</SectionLabel>
          <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
            <p className="text-sm leading-relaxed text-gray-700 mb-3">
              VoltSpec is ready to launch. The question is whether it launches as an
              independent tool that happens to use Elliott data, or as an{" "}
              <strong className="text-gray-900">
                officially supported tool that Elliott stands behind
              </strong>.
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              Options on the table:
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 font-bold mt-0.5">→</span>
                <span><strong>Official pilot program</strong> &mdash; roll out through select branches, measure contractor adoption and order volume</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 font-bold mt-0.5">→</span>
                <span><strong>API / data licensing</strong> &mdash; real-time pricing and inventory feeds would make VoltSpec unbeatable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 font-bold mt-0.5">→</span>
                <span><strong>Co-branded tool</strong> &mdash; &ldquo;Powered by Elliott Electric&rdquo; version that branches promote to their contractors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 font-bold mt-0.5">→</span>
                <span><strong>Sales rep distribution</strong> &mdash; reps hand out access codes, tracked back to their accounts, driving measurable new business</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400">
          <div>
            <span className="font-semibold text-gray-500">VoltSpec LLC</span> &middot; voltspec.online
          </div>
          <div>
            Confidential &mdash; prepared for Elliott Electric Supply
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Components ──────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-3">
      {children}
    </h2>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-gray-900 rounded-lg p-3 text-center">
      <div className="text-2xl font-extrabold text-yellow-400">{number}</div>
      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}

function BulletPoint({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function CapItem({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
      <p className="text-sm font-semibold text-gray-900">{label}</p>
      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{detail}</p>
    </div>
  );
}
