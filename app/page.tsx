import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  FileText,
  DollarSign,
  Calculator,
  ArrowRight,
  Building2,
  Zap,
  ShoppingCart,
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
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24">
        <div className="mb-6">
          <Image src="/logo-transparent.png" alt="VoltSpec" width={80} height={80} className="w-20 h-20 mx-auto opacity-90" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
          Electrical Estimating
          <br />
          <span className="text-yellow-400">Built for the Field</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
          Generate accurate materials lists, realistic SVG blueprints,
          and professional PDF packages — with real Elliott Electric Supply pricing,
          jurisdiction-specific utility rules, and full NEC&nbsp;2026 compliance
          across <span className="text-white font-semibold">Texas, Louisiana, Oklahoma, and Arkansas</span>.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
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
      <section className="border-t border-b border-[hsl(217,33%,18%)] bg-[hsl(222,47%,9%)] px-4 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <StatBlock number="40" label="Jurisdictions" />
          <StatBlock number="29" label="Job Types" />
          <StatBlock number="4" label="States" />
          <StatBlock number="160+" label="Elliott Branches" />
        </div>
      </section>

      {/* Features */}
      <section className="bg-[hsl(222,47%,8%)] px-4 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            Everything you need to spec a job
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            From residential service upgrades to 7-phase data center build-outs — one tool handles it all.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<MapPin className="w-7 h-7" />}
              title="40 Jurisdictions"
              description="Texas, Louisiana, Oklahoma, and Arkansas — each with correct utility rules, panel series, meter sockets, and local code amendments."
            />
            <FeatureCard
              icon={<DollarSign className="w-7 h-7" />}
              title="Real Elliott Pricing"
              description="Actual part numbers, vendor codes, and invoice-derived pricing from Elliott Electric Supply with direct links and one-click Bulk Entry."
            />
            <FeatureCard
              icon={<Layers className="w-7 h-7" />}
              title="29 Job Types"
              description="Residential, commercial, solar, EV chargers, generators, data center phases 1–7, and more — with smart panel type selection."
            />
            <FeatureCard
              icon={<FileText className="w-7 h-7" />}
              title="Professional Exports"
              description="PDF packages, one-page Job Sheets, and quote request emails to your Elliott rep — all with toggleable estimated pricing."
            />
          </div>
        </div>
      </section>

      {/* Coverage Map */}
      <section className="px-4 py-16 sm:py-20 border-t border-[hsl(217,33%,18%)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            Four States. Growing Fast.
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Every jurisdiction has compliant utility rules, meter socket requirements, panel series, and local pricing — so your spec matches what the AHJ actually wants.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StateCard
              state="Texas"
              abbr="TX"
              count={24}
              cities="Austin, San Antonio, Houston, DFW, Corpus Christi, Beaumont, Texarkana, Amarillo, El Paso, Brownsville, Odessa, Abilene, Lubbock, Waco + co-ops"
            />
            <StateCard
              state="Louisiana"
              abbr="LA"
              count={7}
              cities="Shreveport, Monroe, Alexandria, Lafayette, Lake Charles, Baton Rouge, New Orleans"
            />
            <StateCard
              state="Oklahoma"
              abbr="OK"
              count={4}
              cities="Oklahoma City, Tulsa, Lawton, Enid"
            />
            <StateCard
              state="Arkansas"
              abbr="AR"
              count={5}
              cities="Little Rock, Fort Smith, NW Arkansas, Jonesboro, Hot Springs"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 sm:py-20 border-t border-[hsl(217,33%,18%)] bg-[hsl(222,47%,8%)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Three steps. That&apos;s it.
          </h2>
          <div className="space-y-8">
            <Step
              num="1"
              title="Pick your city and job type"
              description="29 job types across 34 jurisdictions — residential services, commercial buildouts, data center phases, solar, EV chargers, generators, and more."
            />
            <Step
              num="2"
              title="Enter your ZIP code"
              description="VoltSpec auto-detects your jurisdiction, utility, panel series (Eaton CH, BR, Pow-R-Line, SPAN, or MBT combo), and finds your nearest Elliott branch."
            />
            <Step
              num="3"
              title="Generate & export"
              description="Get your full materials list with smart grouping, SVG blueprint, NEC code references, and a professional PDF or one-page Job Sheet — instantly."
            />
          </div>
          <div className="text-center mt-12">
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

      {/* Job Types Preview */}
      <section className="px-4 py-16 sm:py-20 border-t border-[hsl(217,33%,18%)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            Job Types
          </h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
            Every job type comes with complete materials, NEC requirements, SVG diagrams, and Elliott pricing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <JobCategory
              title="Residential"
              jobs={[
                "200A Service Upgrade",
                "New 200A Residential",
                "320A & 400A Services",
                "100A Subpanel",
                "Detached Garage Subpanel",
                "Meter Base Replacement",
                "Residential Trim-Out",
                "Temp Power Pole",
              ]}
            />
            <JobCategory
              title="Specialty"
              jobs={[
                "EV Charger (50A & 80A)",
                "Generator + ATS",
                "Solar PV 20kW",
                "Battery Storage",
                "Whole-House Battery + Solar",
                "SPAN Smart Panel",
                "Pool Electrical",
                "Hot Tub / Spa",
                "Landscape Lighting",
              ]}
            />
            <JobCategory
              title="Commercial & Data Center"
              jobs={[
                "Commercial 3-Phase 200A",
                "Commercial 400A 3-Phase",
                "DC Phase 1: Temp Power",
                "DC Phase 2: Switchgear",
                "DC Phase 3: Generator + UPS",
                "DC Phase 4: Duct Bank",
                "DC Phase 5: Critical Distribution",
                "DC Phase 6: Structured Cabling",
                "DC Phase 7: Final Commissioning",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[hsl(217,33%,18%)] bg-[hsl(222,47%,8%)] px-4 py-8 text-center">
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
        <p className="text-xs text-gray-600 mt-2 max-w-lg mx-auto">
          Reference tool only — not engineering advice. Always verify all requirements with your local Authority Having Jurisdiction (AHJ) before installation.
        </p>
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
    <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl p-6 hover:border-yellow-400/30 transition-colors">
      <div className="text-yellow-400 mb-4">{icon}</div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function StateCard({
  state,
  abbr,
  count,
  cities,
}: {
  state: string;
  abbr: string;
  count: number;
  cities: string;
}) {
  return (
    <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl p-5 hover:border-yellow-400/30 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400 font-bold text-sm">
          {abbr}
        </div>
        <div>
          <h3 className="text-white font-semibold">{state}</h3>
          <span className="text-xs text-gray-500">{count} jurisdiction{count !== 1 ? "s" : ""}</span>
        </div>
      </div>
      <p className="text-gray-500 text-xs leading-relaxed">{cities}</p>
    </div>
  );
}

function JobCategory({ title, jobs }: { title: string; jobs: string[] }) {
  return (
    <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl p-5">
      <h3 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider mb-3">{title}</h3>
      <ul className="space-y-1.5">
        {jobs.map((job) => (
          <li key={job} className="flex items-start gap-2 text-sm text-gray-400">
            <Zap className="w-3 h-3 text-yellow-400/50 mt-1 shrink-0" />
            {job}
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
    <div className="flex gap-5 items-start">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-400 text-[hsl(222,47%,7%)] font-extrabold text-lg flex items-center justify-center">
        {num}
      </div>
      <div>
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <p className="text-gray-400 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
