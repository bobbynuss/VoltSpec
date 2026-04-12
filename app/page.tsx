import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  FileText,
  DollarSign,
  Calculator,
  ArrowRight,
  Zap,
  Layers,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[hsl(222,47%,7%)]">
      {/* Nav */}
      <header className="border-b border-[hsl(217,33%,20%)] bg-[hsl(222,47%,8%)] px-4 py-4 flex items-center gap-3">
        <Image src="/logo-transparent.png" alt="VoltSpec" width={28} height={28} className="w-7 h-7" />
        <span className="text-xl font-bold text-white tracking-tight">
          Volt<span className="text-yellow-400">Spec</span>
        </span>
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/load-calc"
            className="text-sm text-gray-400 hover:text-yellow-400 transition-colors font-medium hidden sm:inline"
          >
            Load Calculator
          </Link>
          <Link
            href="/help"
            className="text-sm text-gray-400 hover:text-yellow-400 transition-colors font-medium hidden sm:inline"
          >
            Help
          </Link>
          <Link
            href="/app"
            className="text-sm font-semibold text-[hsl(222,47%,7%)] bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded-lg transition-colors"
          >
            Open App
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-4 py-12 sm:py-24">
        <div className="mb-4 sm:mb-6">
          <Image src="/logo-transparent.png" alt="VoltSpec" width={80} height={80} className="w-14 h-14 sm:w-20 sm:h-20 mx-auto opacity-90" />
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
          Electrical Estimating
          <br />
          <span className="text-yellow-400">Built for the Field</span>
        </h1>
        <p className="mt-5 sm:mt-6 text-base sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
          Materials lists, SVG blueprints, and professional PDFs — with real Elliott Electric pricing
          and NEC&nbsp;2026 compliance across <span className="text-white font-semibold">14 states</span>.
        </p>
        <p className="mt-2 text-sm text-gray-500 max-w-lg hidden sm:block">
          Jurisdiction-specific utility rules, panel series, and code requirements — everywhere Elliott Electric has a counter.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-2 sm:px-0">
          <Link
            href="/app"
            className="inline-flex items-center justify-center gap-2 text-lg font-bold text-[hsl(222,47%,7%)] bg-yellow-400 hover:bg-yellow-300 px-8 py-4 rounded-xl transition-colors shadow-lg shadow-yellow-400/20"
          >
            Open the App
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/load-calc"
            className="inline-flex items-center justify-center gap-2 text-lg font-semibold text-gray-300 border border-[hsl(217,33%,25%)] hover:border-yellow-400/50 hover:text-yellow-400 px-8 py-4 rounded-xl transition-colors"
          >
            <Calculator className="w-5 h-5" />
            NEC Load Calculator
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-t border-b border-[hsl(217,33%,18%)] bg-[hsl(222,47%,9%)] px-6 sm:px-4 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 text-center">
          <StatBlock number="74" label="Jurisdictions" />
          <StatBlock number="29" label="Job Types" />
          <StatBlock number="14" label="States" />
          <StatBlock number="204" label="Elliott Branches" />
        </div>
      </section>

      {/* Features */}
      <section className="bg-[hsl(222,47%,8%)] px-6 sm:px-4 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-bold text-white text-center mb-3 sm:mb-4">
            Everything you need to spec a job
          </h2>
          <p className="text-gray-500 text-center mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base">
            From residential service upgrades to 7-phase data center build-outs — one tool handles it all.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <FeatureCard
              icon={<MapPin className="w-6 h-6 sm:w-7 sm:h-7" />}
              title="74 Jurisdictions"
              description="14 states with compliant utility rules, panel series, and local code requirements."
            />
            <FeatureCard
              icon={<DollarSign className="w-6 h-6 sm:w-7 sm:h-7" />}
              title="Real Elliott Pricing"
              description="Actual part numbers, vendor codes, and invoice-derived pricing with direct links and Bulk Entry."
            />
            <FeatureCard
              icon={<Layers className="w-6 h-6 sm:w-7 sm:h-7" />}
              title="29 Job Types"
              description="Residential, commercial, solar, EV, generators, data center phases 1–7, and more."
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6 sm:w-7 sm:h-7" />}
              title="Professional Exports"
              description="PDF packages, one-page Job Sheets, and quote requests — with toggleable pricing."
            />
          </div>
        </div>
      </section>

      {/* Coverage — compact state strip */}
      <section className="px-6 sm:px-4 py-12 sm:py-16 border-t border-[hsl(217,33%,18%)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-bold text-white text-center mb-3 sm:mb-4">
            Coast to Coast
          </h2>
          <p className="text-gray-500 text-center mb-8 sm:mb-10 max-w-xl mx-auto text-sm sm:text-base">
            74 jurisdictions across 14 states — everywhere Elliott Electric has a counter.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-3xl mx-auto">
            {([
              ["TX", 31], ["LA", 7], ["OK", 6], ["AR", 8], ["AZ", 3],
              ["CO", 3], ["FL", 2], ["GA", 2], ["KS", 3], ["MO", 1],
              ["NC", 2], ["NM", 3], ["SC", 1], ["TN", 2],
            ] as const).map(([abbr, count]) => (
              <div
                key={abbr}
                className="flex items-center gap-2 bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 hover:border-yellow-400/30 transition-colors"
              >
                <span className="text-yellow-400 font-bold text-sm">{abbr}</span>
                <span className="text-gray-500 text-xs">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 sm:px-4 py-12 sm:py-16 border-t border-[hsl(217,33%,18%)] bg-[hsl(222,47%,8%)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-10">
            Three steps. That&apos;s it.
          </h2>
          <div className="space-y-6 sm:space-y-8">
            <Step
              num="1"
              title="Pick your city and job type"
              description="74 jurisdictions, 29 job types — residential, commercial, data center, solar, EV, and more."
            />
            <Step
              num="2"
              title="Enter your ZIP code"
              description="Auto-detects your utility, panel series, and nearest Elliott branch."
            />
            <Step
              num="3"
              title="Generate & export"
              description="Full materials list, SVG blueprint, NEC references, and a professional PDF — instantly."
            />
          </div>
          <div className="text-center mt-10 sm:mt-12">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 text-lg font-bold text-[hsl(222,47%,7%)] bg-yellow-400 hover:bg-yellow-300 px-8 py-4 rounded-xl transition-colors shadow-lg shadow-yellow-400/20"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Job Types — condensed */}
      <section className="px-6 sm:px-4 py-12 sm:py-16 border-t border-[hsl(217,33%,18%)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-bold text-white text-center mb-3 sm:mb-4">
            29 Job Types
          </h2>
          <p className="text-gray-500 text-center mb-8 sm:mb-10 max-w-xl mx-auto text-sm sm:text-base">
            Complete materials, NEC requirements, SVG diagrams, and Elliott pricing for every one.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <JobColumn
              title="Residential"
              items={["200A Service Upgrade", "New 200A Residential", "320A & 400A Services", "Subpanels", "Meter Base Replacement", "Trim-Out & Temp Power"]}
            />
            <JobColumn
              title="Specialty"
              items={["EV Charger (50A & 80A)", "Generator + ATS", "Solar PV & Battery", "SPAN Smart Panel", "Pool & Hot Tub", "Landscape Lighting"]}
            />
            <JobColumn
              title="Commercial"
              items={["3-Phase 200A & 400A", "Data Center Phases 1–7", "Switchgear & UPS", "Duct Bank", "Critical Distribution", "Structured Cabling"]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[hsl(217,33%,18%)] bg-[hsl(222,47%,8%)] px-6 sm:px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Image src="/logo-transparent.png" alt="VoltSpec" width={20} height={20} className="w-5 h-5 opacity-70" />
          <span className="text-sm font-semibold text-gray-400">
            Volt<span className="text-yellow-400/70">Spec</span>
          </span>
        </div>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} VoltSpec —{" "}
          <a
            href="https://voltspec.online"
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            voltspec.online
          </a>
        </p>
        <div className="flex items-center justify-center gap-2 mt-3 text-amber-400/80">
          <span className="text-sm">⚠️</span>
          <p className="text-xs sm:text-sm font-medium">
            Reference tool only — not engineering advice. Always verify with your local AHJ.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Components ──────────────────────────────────────────────────── */

function StatBlock({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl sm:text-4xl font-extrabold text-yellow-400">{number}</div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl p-5 sm:p-6 hover:border-yellow-400/30 transition-colors flex sm:block items-start gap-4">
      <div className="text-yellow-400 mb-0 sm:mb-3 shrink-0 mt-0.5 sm:mt-0">{icon}</div>
      <div>
        <h3 className="text-white font-semibold text-base sm:text-lg mb-1 sm:mb-1.5">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function JobColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl p-4 sm:p-5">
      <h3 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider mb-2.5 sm:mb-3">{title}</h3>
      <ul className="space-y-1 sm:space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[13px] sm:text-sm text-gray-400">
            <Zap className="w-3 h-3 text-yellow-400/50 mt-0.5 sm:mt-1 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Step({
  num,
  title,
  description,
}: {
  num: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 sm:gap-5 items-start">
      <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-yellow-400 text-[hsl(222,47%,7%)] font-extrabold text-base sm:text-lg flex items-center justify-center">
        {num}
      </div>
      <div>
        <h3 className="text-white font-semibold text-base sm:text-lg">{title}</h3>
        <p className="text-gray-400 mt-1 leading-relaxed text-sm sm:text-base">{description}</p>
      </div>
    </div>
  );
}
