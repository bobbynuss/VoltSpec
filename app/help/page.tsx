"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Zap,
  CloudUpload,
  Send,
  FileDown,
  Lightbulb,
  ArrowLeft,
  ChevronRight,
  PlayCircle,
  ShoppingCart,
  FileImage,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";

const steps = [
  {
    num: 1,
    tourIndex: 0,
    title: "Search 74 Jurisdictions Across 14 States",
    icon: Building2,
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/25 hover:border-blue-400/50",
    body: "Use the Search bar to quickly find any city or job type — just start typing. VoltSpec covers 74 jurisdictions across 14 states (TX, LA, OK, AR, AZ, CO, FL, GA, KS, MO, NM, NC, SC, TN). Filter by state, or pick from the dropdowns. Enter your ZIP code and the nearest Elliott branch auto-populates.",
  },
  {
    num: 2,
    tourIndex: 2,
    title: "29 Job Types — Residential to Data Center",
    icon: Layers,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/25 hover:border-cyan-400/50",
    body: "Choose from 29 job types: residential services (200A, 320A, 400A), subpanels, EV chargers, generators, solar PV, battery storage, pool/spa, landscape lighting, trim-out, commercial 3-phase, and a full 7-phase Data Center Build-Out series. Every job comes with NEC 2026 requirements, materials, and a schematic.",
  },
  {
    num: 3,
    tourIndex: 3,
    title: "Generate the Full Package",
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/25 hover:border-yellow-400/50",
    body: "Hit the big yellow button. VoltSpec builds everything: NEC 2026 requirements, a complete bill of materials with real Elliott Electric part numbers and vendor codes, an SVG schematic blueprint, your nearest Elliott branch, and official utility/code docs — all customized for your jurisdiction.",
  },
  {
    num: 4,
    tourIndex: 4,
    title: "Materials — Panel Types, Pricing & Bulk Entry",
    icon: Lightbulb,
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/25 hover:border-purple-400/50",
    body: "Materials auto-group into 7 sections. Use the Panel Type selector to swap between Eaton CH, BR, Pow-R-Line, SPAN Smart Panel, or MBT combo — the entire BOM updates instantly. Toggle estimated pricing on/off. Every item has direct Elliott Product and Search links. Copy Bulk Entry pastes into Elliott's order system.",
  },
  {
    num: 5,
    tourIndex: 6,
    title: "Quote Request — Email Your Elliott Rep",
    icon: Send,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/25 hover:border-emerald-400/50",
    body: "When logged in, the Quote Request button sends your full BOM — vendor codes, part numbers, quantities — directly to your Elliott sales rep. The email auto-CCs the rep based on your profile. No more re-typing orders at the counter.",
  },
  {
    num: 6,
    tourIndex: 8,
    title: "Export — PDF Package & Job Sheet",
    icon: FileDown,
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/25 hover:border-orange-400/50",
    body: "PDF Package generates a professional multi-page document with cover, requirements, materials table, blueprint, and supplier info. Job Sheet is a one-page condensed version for the field. Both include the toggleable estimated pricing column. Email button downloads the PDF and opens a pre-filled email.",
  },
  {
    num: 7,
    tourIndex: 5,
    title: "Cloud Save — Access Anywhere",
    icon: CloudUpload,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/25 hover:border-cyan-400/50",
    body: "Sign up (free) and save jobs to the cloud. Click Save Job, name it, and re-open from the Projects panel anytime. Works across devices — start on your laptop, pull it up on your phone at the counter.",
  },
];

const extraFeatures = [
  {
    title: "Quick List",
    icon: ShoppingCart,
    color: "text-yellow-400",
    body: "Build a custom materials list for truck stock, punch lists, or service calls — no job template needed. Start from a template (Residential Service, Trim-Out, Commercial, or Truck Stock), browse 75+ parts by category, or add items free-form. Copy Bulk Entry sends everything to Elliott's order system.",
  },
  {
    title: "AI Plan Takeoff (Beta)",
    icon: FileImage,
    color: "text-yellow-400",
    body: "Upload a photo or screenshot of an electrical plan and VoltSpec AI analyzes it — counting symbols, identifying devices, and generating a BOM with real Elliott part numbers. Select the items you want and add them to your Quick List. Works best on clear residential floor plans.",
  },
  {
    title: "NEC Load Calculator",
    icon: Layers,
    color: "text-yellow-400",
    body: "Full NEC 2026 Article 220 Standard Method residential load calculator. Enter your square footage, appliances, HVAC, and EV charger — get the total calculated load, recommended service size, and conductor sizing. Access it from the sidebar or the top nav.",
  },
];

export default function HelpPage() {
  const router = useRouter();

  const launchTour = (tourIndex: number) => {
    router.push(`/app?tour=${tourIndex}`);
  };

  const launchFullTour = () => {
    router.push("/app?tour=0");
  };

  return (
    <div className="min-h-screen bg-[hsl(222,47%,7%)] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[hsl(217,33%,20%)] bg-[hsl(222,47%,8%)] px-3 sm:px-6 py-3 flex items-center gap-3">
        <Link href="/app" className="text-gray-400 hover:text-yellow-400 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <Image src="/logo-transparent.png" alt="VoltSpec" width={24} height={24} className="w-6 h-6" />
        <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          Volt<span className="text-yellow-400">Spec</span>
          <span className="text-gray-500 font-normal text-sm ml-2">Quick Start Guide</span>
        </h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Hero */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <Image src="/logo-transparent.png" alt="VoltSpec" width={80} height={80} className="w-20 h-20 drop-shadow-[0_0_24px_rgba(250,204,21,0.35)]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              How to Use <span className="text-yellow-400">VoltSpec</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-2">
              Generate NEC 2026 job packages, order materials from Elliott Electric,
              and export professional PDFs — in about 30 seconds.
            </p>
            <p className="text-xs text-gray-500 mb-6">
              74 jurisdictions · 14 states · 29 job types · 204 Elliott branches
            </p>

            {/* Start Tour CTA */}
            <Button
              onClick={launchFullTour}
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 font-bold text-sm px-6 h-12 shadow-lg shadow-yellow-400/20 transition-colors touch-manipulation gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Start Interactive Tour
            </Button>
            <p className="text-xs text-gray-600 mt-2">
              Walks you through the app step by step with live highlighting
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[hsl(217,33%,20%)]" />
            <span className="text-xs text-gray-600 uppercase tracking-wider">or read the steps</span>
            <div className="flex-1 h-px bg-[hsl(217,33%,20%)]" />
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step) => (
              <button
                key={step.num}
                onClick={() => launchTour(step.tourIndex)}
                className={`rounded-xl border p-4 sm:p-5 ${step.bg} transition-all duration-150 w-full text-left cursor-pointer group`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,22%)]">
                    <step.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${step.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
                      <span className={`${step.color} text-xs font-bold bg-[hsl(222,47%,10%)] rounded-full w-5 h-5 flex items-center justify-center shrink-0`}>
                        {step.num}
                      </span>
                      {step.title}
                      <PlayCircle className={`w-3.5 h-3.5 ${step.color} opacity-0 group-hover:opacity-100 transition-opacity ml-auto shrink-0`} />
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-1.5">{step.body}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Extra Features */}
          <div className="mt-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-[hsl(217,33%,20%)]" />
              <span className="text-xs text-gray-600 uppercase tracking-wider">More Tools</span>
              <div className="flex-1 h-px bg-[hsl(217,33%,20%)]" />
            </div>
            <div className="space-y-4">
              {extraFeatures.map((feat) => (
                <div
                  key={feat.title}
                  className="rounded-xl border border-[hsl(217,33%,20%)] p-4 sm:p-5 bg-[hsl(222,47%,10%)]"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[hsl(222,47%,8%)] border border-[hsl(217,33%,22%)]">
                      <feat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${feat.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-sm sm:text-base">{feat.title}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-1.5">{feat.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center space-y-3">
            <Link href="/app">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 font-bold text-sm px-8 h-12 shadow-lg shadow-yellow-400/20 transition-colors touch-manipulation"
              >
                Got It — Start Building
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <p className="text-xs text-gray-600">
              Questions? Use the AI chat in the sidebar — it knows electrical code.
            </p>
          </div>
        </div>
      </main>

      {/* Legal Disclaimers */}
      <LegalDisclaimer />
    </div>
  );
}
