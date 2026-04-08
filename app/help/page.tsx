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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: 1,
    tourIndex: 0,
    title: "Choose Your City & Job Type",
    icon: Building2,
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/25 hover:border-blue-400/50",
    body: "Open the sidebar and pick your city from the dropdown \u2014 VoltSpec loads the right utility, panel series, and pricing for that jurisdiction. Then choose a job type like 200A Service Upgrade or Residential Final Trim-Out. Enter your ZIP code and you\u2019re ready.",
  },
  {
    num: 2,
    tourIndex: 2,
    title: "Generate the Full Package",
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/25 hover:border-yellow-400/50",
    body: "Hit the big yellow Generate Full Package button. VoltSpec builds everything in one shot: NEC 2026 requirements, a complete bill of materials with Elliott Electric part numbers and vendor codes, a schematic blueprint, supplier contacts, and official docs.",
  },
  {
    num: 3,
    tourIndex: 3,
    title: "Save Your Job to the Cloud",
    icon: CloudUpload,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/25 hover:border-cyan-400/50",
    body: "Sign up (free) and your jobs save to the cloud automatically. Click Save Job in the action bar, give it a name, and it\u2019s stored under your account. Re-open any saved project from the Projects panel.",
  },
  {
    num: 4,
    tourIndex: 4,
    title: "Send a Quote Request to Elliott",
    icon: Send,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/25 hover:border-emerald-400/50",
    body: "When you\u2019re logged in, a green Quote Request button appears. It opens a modal with your full BOM \u2014 vendor codes, part numbers, quantities \u2014 all ready to go. Add your company name, phone, and notes, then hit Send. You\u2019ll get a formatted email with a Bulk Entry section for Elliott\u2019s Rapid Order pad.",
  },
  {
    num: 5,
    tourIndex: 5,
    title: "Export PDF or Job Sheet",
    icon: FileDown,
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/25 hover:border-orange-400/50",
    body: "The PDF Package button generates a professional multi-page PDF with a cover page, requirements, materials table, blueprint, and supplier info. The Job Sheet is a one-page condensed version you can print and bring to the job site.",
  },
  {
    num: 6,
    tourIndex: 6,
    title: "Devices & Lighting Section",
    icon: Lightbulb,
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/25 hover:border-purple-400/50",
    body: "The Materials tab groups items automatically. The Devices & Lighting section (\ud83d\udca1) collects all your switches, receptacles, GFCI outlets, dimmers, wall plates, smoke detectors, and LED fixtures \u2014 each with the correct Elliott vendor code (EWD, LUT, BRK).",
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
        <Image
          src="/logo-transparent.png"
          alt="VoltSpec"
          width={24}
          height={24}
          className="w-6 h-6"
        />
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
              <Image
                src="/logo-transparent.png"
                alt="VoltSpec"
                width={80}
                height={80}
                className="w-20 h-20 drop-shadow-[0_0_24px_rgba(250,204,21,0.35)]"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              How to Use <span className="text-yellow-400">VoltSpec</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6">
              Generate NEC 2026 job packages, order materials from Elliott Electric,
              and export professional PDFs — in about 30 seconds.
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

          {/* Steps — clickable cards */}
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
                      <span
                        className={`${step.color} text-xs font-bold bg-[hsl(222,47%,10%)] rounded-full w-5 h-5 flex items-center justify-center shrink-0`}
                      >
                        {step.num}
                      </span>
                      {step.title}
                      <PlayCircle className={`w-3.5 h-3.5 ${step.color} opacity-0 group-hover:opacity-100 transition-opacity ml-auto shrink-0`} />
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-1.5">
                      {step.body}
                    </p>
                  </div>
                </div>
              </button>
            ))}
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
    </div>
  );
}
