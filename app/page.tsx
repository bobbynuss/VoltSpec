import Link from "next/link";
import {
  Zap,
  MapPin,
  FileText,
  DollarSign,
  Calculator,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[hsl(222,47%,7%)]">
      {/* Nav */}
      <header className="border-b border-[hsl(217,33%,20%)] bg-[hsl(222,47%,8%)] px-4 py-4 flex items-center gap-3">
        <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
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
          <Zap className="w-20 h-20 text-yellow-400 fill-yellow-400 mx-auto opacity-90" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
          Electrical Estimating
          <br />
          <span className="text-yellow-400">for Texas</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
          Instantly generate accurate materials lists, realistic SVG blueprints,
          and ready-to-submit PDF packages — with real Elliott Electric pricing
          and NEC&nbsp;2026 code compliance.
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

      {/* Features */}
      <section className="border-t border-[hsl(217,33%,18%)] bg-[hsl(222,47%,8%)] px-4 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Everything you need to spec a job
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<MapPin className="w-7 h-7" />}
              title="12 Texas Jurisdictions"
              description="Austin, San Antonio, Houston, DFW, Amarillo, El Paso, Corpus Christi, Odessa, Abilene, PEC, GVEC, and BEC — each with correct utility & panel series."
            />
            <FeatureCard
              icon={<DollarSign className="w-7 h-7" />}
              title="Real Elliott Pricing"
              description="Actual part numbers and pricing from Elliott Electric Supply with direct links and Bulk Entry support."
            />
            <FeatureCard
              icon={<Calculator className="w-7 h-7" />}
              title="NEC Load Calculator"
              description="Built-in NEC 2026 load calculator that auto-selects the right service size and feeds directly into your spec."
            />
            <FeatureCard
              icon={<FileText className="w-7 h-7" />}
              title="Professional PDFs"
              description="One-click PDF export with materials, blueprints, code references, and a toggleable estimated cost column."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Three steps. That&apos;s it.
          </h2>
          <div className="space-y-8">
            <Step
              num="1"
              title="Pick your job type"
              description="16 job types — from 200A service upgrades to EV chargers, sub-panels, generators, and commercial services."
            />
            <Step
              num="2"
              title="Enter your ZIP code"
              description="VoltSpec auto-detects your jurisdiction, utility, and the correct panel series (Eaton CH, BR, or Pow-R-Line)."
            />
            <Step
              num="3"
              title="Generate & export"
              description="Get your full materials list, SVG blueprint, NEC code references, and a professional PDF — instantly."
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

      {/* Footer */}
      <footer className="border-t border-[hsl(217,33%,18%)] bg-[hsl(222,47%,8%)] px-4 py-6 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} VoltSpec —{" "}
          <a
            href="https://voltspec.online"
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            voltspec.online
          </a>
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Reference tool only — always verify with your local AHJ before installation.
        </p>
      </footer>
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
