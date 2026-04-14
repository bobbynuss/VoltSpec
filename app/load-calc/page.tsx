"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Calculator,
  Home,
  Flame,
  Wind,
  Car,
  Waves,
  Plug,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Download,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  calculateLoad,
  DEFAULT_INPUTS,
  type LoadCalcInputs,
} from "@/lib/loadCalc";

/* ── Helpers ────────────────────────────────────────────────────────── */

function NumberInput({
  label,
  value,
  onChange,
  suffix = "watts",
  min = 0,
  max = 999999,
  step = 100,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-400">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="numeric"
          value={value || ""}
          onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value) || 0)))}
          min={min}
          max={max}
          step={step}
          placeholder="0"
          className="
            w-full px-3 py-2.5 sm:py-2 rounded-md text-sm
            bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)]
            text-white placeholder-gray-600
            focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400
            transition-colors [appearance:textfield] h-11 sm:h-9
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          "
        />
        <span className="text-xs text-gray-500 shrink-0 w-10">{suffix}</span>
      </div>
      {hint && <p className="text-xs text-gray-600 leading-snug">{hint}</p>}
    </div>
  );
}

function ResultRow({
  label,
  va,
  detail,
  bold,
  accent,
}: {
  label: string;
  va: number;
  detail?: string;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 py-2 ${bold ? "border-t-2 border-[hsl(217,33%,22%)] pt-3" : "border-b border-[hsl(217,33%,14%)]"}`}
    >
      <div className="flex-1">
        <span className={`text-sm ${bold ? "font-bold text-white" : "text-gray-300"}`}>
          {label}
        </span>
        {detail && <p className="text-xs text-gray-500 mt-0.5">{detail}</p>}
      </div>
      <span
        className={`text-sm font-mono shrink-0 ${
          accent
            ? "text-yellow-400 font-bold text-base"
            : bold
              ? "text-white font-bold"
              : "text-gray-300"
        }`}
      >
        {va.toLocaleString()} VA
      </span>
    </div>
  );
}

/* ── Presets ─────────────────────────────────────────────────────────── */

const PRESETS: { label: string; desc: string; inputs: Partial<LoadCalcInputs> }[] = [
  {
    label: "Basic Home",
    desc: "1,500 sqft, gas heat, no EV",
    inputs: {
      sqft: 1500,
      rangeWatts: 8000,
      dryerWatts: 5000,
      waterHeaterWatts: 4500,
      dishwasherWatts: 1200,
      disposalWatts: 600,
      acWatts: 3500,
      heatWatts: 0,
      evChargerWatts: 0,
      poolPumpWatts: 0,
      hotTubWatts: 0,
      otherFixedWatts: 0,
    },
  },
  {
    label: "Typical 2,000 sqft",
    desc: "Standard Texas home",
    inputs: { ...DEFAULT_INPUTS },
  },
  {
    label: "Large w/ EV",
    desc: "3,000 sqft, EV charger, all-electric",
    inputs: {
      sqft: 3000,
      rangeWatts: 12000,
      dryerWatts: 5500,
      waterHeaterWatts: 4500,
      dishwasherWatts: 1400,
      disposalWatts: 800,
      acWatts: 6000,
      heatWatts: 10000,
      evChargerWatts: 9600,
      poolPumpWatts: 0,
      hotTubWatts: 0,
      otherFixedWatts: 0,
    },
  },
  {
    label: "Luxury Estate",
    desc: "5,000 sqft, pool, hot tub, EV, workshop",
    inputs: {
      sqft: 5000,
      smallApplianceCircuits: 3,
      rangeWatts: 16000,
      dryerWatts: 5500,
      waterHeaterWatts: 5500,
      dishwasherWatts: 1400,
      disposalWatts: 800,
      acWatts: 10000,
      heatWatts: 15000,
      evChargerWatts: 11520,
      poolPumpWatts: 2400,
      hotTubWatts: 6000,
      otherFixedWatts: 3000,
    },
  },
];

/* ── Common nameplate reference values ──────────────────────────────── */

const COMMON_VALUES = {
  range: [
    { label: "30\" Standard Range", watts: 8000 },
    { label: "30\" Self-Clean Range", watts: 12000 },
    { label: "36\" Pro Range", watts: 16000 },
    { label: "Double Oven", watts: 14000 },
    { label: "Cooktop Only", watts: 6600 },
    { label: "Wall Oven Only", watts: 5000 },
  ],
  dryer: [
    { label: "Standard Dryer", watts: 5000 },
    { label: "Large Capacity", watts: 5500 },
    { label: "Heat Pump Dryer", watts: 2000 },
  ],
  waterHeater: [
    { label: "40 gal Standard", watts: 4500 },
    { label: "50 gal Standard", watts: 5500 },
    { label: "Tankless Electric", watts: 18000 },
    { label: "Heat Pump WH", watts: 2500 },
  ],
  ac: [
    { label: "2 Ton (small home)", watts: 3500 },
    { label: "3 Ton (avg home)", watts: 5000 },
    { label: "4 Ton (large home)", watts: 6000 },
    { label: "5 Ton (estate)", watts: 7500 },
    { label: "Dual 3+2 Ton", watts: 8500 },
    { label: "Dual 5+3 Ton", watts: 12500 },
  ],
  heat: [
    { label: "10 kW strip heat", watts: 10000 },
    { label: "15 kW strip heat", watts: 15000 },
    { label: "20 kW strip heat", watts: 20000 },
  ],
  ev: [
    { label: "Level 2 — 24A / 240V", watts: 5760 },
    { label: "Level 2 — 32A / 240V", watts: 7680 },
    { label: "Level 2 — 40A / 240V", watts: 9600 },
    { label: "Level 2 — 48A / 240V", watts: 11520 },
  ],
};

/* ── Quick-pick dropdown ────────────────────────────────────────────── */

function QuickPick({
  options,
  onSelect,
}: {
  options: { label: string; watts: number }[];
  onSelect: (watts: number) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-xs text-yellow-400/70 hover:text-yellow-400 transition-colors flex items-center gap-1 min-h-[44px] sm:min-h-0 px-2 touch-manipulation"
      >
        Common values {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      {open && (
        <div className="absolute z-20 mt-1 right-0 sm:left-0 sm:right-auto bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,22%)] rounded-md shadow-xl py-1 min-w-[220px] max-h-[60vh] overflow-y-auto">
          {options.map((o) => (
            <button
              key={o.label}
              type="button"
              onClick={() => {
                onSelect(o.watts);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 sm:px-3 sm:py-1.5 text-xs text-gray-300 hover:bg-yellow-400/10 hover:text-yellow-300 active:bg-yellow-400/20 transition-colors flex justify-between gap-4 touch-manipulation"
            >
              <span>{o.label}</span>
              <span className="text-gray-500">{o.watts.toLocaleString()}W</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Page Component ─────────────────────────────────────────────────── */

export default function LoadCalcPage() {
  const [inputs, setInputs] = useState<LoadCalcInputs>({ ...DEFAULT_INPUTS });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const update = (field: keyof LoadCalcInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const applyPreset = (preset: Partial<LoadCalcInputs>) => {
    setInputs((prev) => ({ ...prev, ...preset }));
  };

  const result = useMemo(() => calculateLoad(inputs), [inputs]);

  const serviceColor =
    result.recommendedService <= 100
      ? "text-emerald-400"
      : result.recommendedService <= 200
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(222,47%,7%)]">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-[hsl(217,33%,20%)] bg-[hsl(222,47%,8%)] px-4 py-3 flex items-center gap-2 sm:gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white min-w-[44px] min-h-[44px]">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <Image src="/logo-transparent.png" alt="VoltSpec" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
        <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          Volt<span className="text-yellow-400">Spec</span>
        </h1>
        <span className="text-xs text-gray-500 ml-1 mt-0.5 hidden sm:inline">Load Calculator</span>
        <div className="ml-auto text-xs text-gray-600 hidden md:block">
          NEC 2026 · Article 220 Standard Method
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Title + presets */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Calculator className="w-6 h-6 text-yellow-400" />
                Residential Load Calculator
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                NEC Article 220 Standard Method — enter your loads, get your service size
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p.inputs)}
                  className="px-4 py-2.5 sm:px-3 sm:py-1.5 rounded-md text-xs font-medium border border-[hsl(217,33%,22%)] text-gray-400 hover:text-yellow-400 hover:border-yellow-400/40 active:bg-yellow-400/10 transition-colors touch-manipulation"
                  title={p.desc}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            {/* ── Results first on mobile (order-first), inputs first on desktop ── */}

            {/* ── LEFT: Inputs ─────────────────────────────────── */}
            <div className="space-y-4 order-2 lg:order-1">
              {/* General */}
              <Card className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,20%)]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center gap-2">
                    <Home className="w-4 h-4 text-yellow-400" />
                    Dwelling — General Lighting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <NumberInput
                    label="Heated Square Footage"
                    value={inputs.sqft}
                    onChange={(v) => update("sqft", v)}
                    suffix="sqft"
                    step={100}
                    hint="NEC 220.12: 3 VA per square foot for general lighting"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <NumberInput
                      label="Small Appliance Circuits"
                      value={inputs.smallApplianceCircuits}
                      onChange={(v) => update("smallApplianceCircuits", v)}
                      suffix="(min 2)"
                      min={2}
                      max={10}
                      step={1}
                      hint="NEC 220.52(A): 1500 VA each"
                    />
                    <NumberInput
                      label="Laundry Circuits"
                      value={inputs.laundryCircuits}
                      onChange={(v) => update("laundryCircuits", v)}
                      suffix="(min 1)"
                      min={1}
                      max={5}
                      step={1}
                      hint="NEC 220.52(B): 1500 VA each"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Kitchen / Laundry Appliances */}
              <Card className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,20%)]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center gap-2">
                    <Flame className="w-4 h-4 text-yellow-400" />
                    Kitchen &amp; Laundry Appliances
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">Electric Range / Oven / Cooktop</span>
                    <QuickPick options={COMMON_VALUES.range} onSelect={(w) => update("rangeWatts", w)} />
                  </div>
                  <NumberInput
                    label=""
                    value={inputs.rangeWatts}
                    onChange={(v) => update("rangeWatts", v)}
                    hint="NEC 220.55: demand factor applied (8 kW for ≤12 kW range). Set 0 for gas."
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">Electric Dryer</span>
                    <QuickPick options={COMMON_VALUES.dryer} onSelect={(w) => update("dryerWatts", w)} />
                  </div>
                  <NumberInput
                    label=""
                    value={inputs.dryerWatts}
                    onChange={(v) => update("dryerWatts", v)}
                    hint="NEC 220.54: 5000 VA minimum or nameplate, whichever is larger. Set 0 for gas."
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-400">Water Heater</span>
                        <QuickPick options={COMMON_VALUES.waterHeater} onSelect={(w) => update("waterHeaterWatts", w)} />
                      </div>
                      <NumberInput
                        label=""
                        value={inputs.waterHeaterWatts}
                        onChange={(v) => update("waterHeaterWatts", v)}
                        hint="0 if gas or tankless gas"
                      />
                    </div>
                    <NumberInput
                      label="Dishwasher"
                      value={inputs.dishwasherWatts}
                      onChange={(v) => update("dishwasherWatts", v)}
                      hint="Typical: 1,200W"
                    />
                  </div>
                  <NumberInput
                    label="Garbage Disposal"
                    value={inputs.disposalWatts}
                    onChange={(v) => update("disposalWatts", v)}
                    hint="Typical: 600–900W"
                  />
                </CardContent>
              </Card>

              {/* HVAC */}
              <Card className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,20%)]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center gap-2">
                    <Wind className="w-4 h-4 text-yellow-400" />
                    HVAC — Heating &amp; Cooling
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-2.5 rounded-lg bg-blue-900/20 border border-blue-700/30 text-xs text-blue-300 flex gap-2">
                    <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>NEC 220.60: Only the <strong>larger</strong> of A/C or heat is counted (non-coincident loads).</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">A/C Compressor</span>
                    <QuickPick options={COMMON_VALUES.ac} onSelect={(w) => update("acWatts", w)} />
                  </div>
                  <NumberInput
                    label=""
                    value={inputs.acWatts}
                    onChange={(v) => update("acWatts", v)}
                    hint="Running watts or nameplate amps × 240V"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">Electric Heat (strips / furnace)</span>
                    <QuickPick options={COMMON_VALUES.heat} onSelect={(w) => update("heatWatts", w)} />
                  </div>
                  <NumberInput
                    label=""
                    value={inputs.heatWatts}
                    onChange={(v) => update("heatWatts", v)}
                    hint="Set 0 for gas furnace"
                  />
                </CardContent>
              </Card>

              {/* Additional Loads */}
              <Card className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,20%)]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-sm flex items-center gap-2">
                      <Plug className="w-4 h-4 text-yellow-400" />
                      Additional Loads
                    </CardTitle>
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors"
                    >
                      {showAdvanced ? "Hide" : "Show"}{" "}
                      {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">EV Charger</span>
                    <QuickPick options={COMMON_VALUES.ev} onSelect={(w) => update("evChargerWatts", w)} />
                  </div>
                  <NumberInput
                    label=""
                    value={inputs.evChargerWatts}
                    onChange={(v) => update("evChargerWatts", v)}
                    hint="Level 2: typically 7,680W (32A) or 9,600W (40A)"
                  />
                  {showAdvanced && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <NumberInput
                          label="Pool Pump"
                          value={inputs.poolPumpWatts}
                          onChange={(v) => update("poolPumpWatts", v)}
                          hint="Typical: 1,500–2,400W"
                        />
                        <NumberInput
                          label="Hot Tub / Spa"
                          value={inputs.hotTubWatts}
                          onChange={(v) => update("hotTubWatts", v)}
                          hint="Typical: 4,000–6,000W"
                        />
                      </div>
                      <NumberInput
                        label="Other Fixed Loads (workshop, sauna, etc.)"
                        value={inputs.otherFixedWatts}
                        onChange={(v) => update("otherFixedWatts", v)}
                        hint="Total additional nameplate watts"
                      />
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* ── RIGHT: Results ────────────────────────────────── */}
            <div className="space-y-4 order-1 lg:order-2 lg:sticky lg:top-20 lg:self-start">
              {/* Service recommendation hero */}
              <Card className="bg-[hsl(222,47%,10%)] border-yellow-400/40 ring-1 ring-yellow-400/20">
                <CardContent className="pt-5 pb-5 text-center">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Recommended Service
                  </p>
                  <p className={`text-4xl font-bold ${serviceColor}`}>
                    {result.recommendedService}A
                  </p>
                  <p className="text-sm text-gray-300 mt-1">{result.recommendedServiceLabel}</p>
                  <div className="flex justify-center gap-3 mt-3">
                    <Badge className="bg-[hsl(217,33%,13%)] text-gray-300 border-[hsl(217,33%,22%)] text-xs">
                      {Math.round(result.totalAmps)}A calculated
                    </Badge>
                    <Badge className="bg-[hsl(217,33%,13%)] text-gray-300 border-[hsl(217,33%,22%)] text-xs">
                      {result.totalVA.toLocaleString()} VA
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <Link href={`/app?job=${result.recommendedService <= 100 ? "100a-subpanel" : result.recommendedService <= 200 ? "new-200a-residential" : result.recommendedService <= 320 ? "new-320a-service" : "new-400a-service"}`}>
                      <Button
                        size="sm"
                        className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 active:bg-yellow-500 font-semibold text-xs transition-colors"
                      >
                        <Zap className="w-3.5 h-3.5 mr-1.5 fill-gray-900" />
                        Generate {result.recommendedService}A Job Package
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed breakdown */}
              <Card className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,20%)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">
                    Load Breakdown — NEC 220
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0">
                  <ResultRow
                    label="General Lighting"
                    va={result.generalLighting}
                    detail={`${inputs.sqft.toLocaleString()} sqft × 3 VA/sqft`}
                  />
                  <ResultRow
                    label="Small Appliance Circuits"
                    va={result.smallApplianceLoad}
                    detail={`${Math.max(inputs.smallApplianceCircuits, 2)} circuits × 1,500 VA`}
                  />
                  <ResultRow
                    label="Laundry Circuit"
                    va={result.laundryLoad}
                    detail={`${Math.max(inputs.laundryCircuits, 1)} circuit × 1,500 VA`}
                  />

                  <div className="py-2 border-b border-[hsl(217,33%,14%)]">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Demand Factor (Table 220.42)
                    </p>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>First 10,000 VA at 100%</span>
                      <span className="font-mono">{result.generalFirst10k.toLocaleString()} VA</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Remainder at 40%</span>
                      <span className="font-mono">{Math.round(result.generalRemainder).toLocaleString()} VA</span>
                    </div>
                  </div>

                  <ResultRow
                    label="General + SA + Laundry (net)"
                    va={Math.round(result.generalNet)}
                    bold
                  />

                  {result.rangeDemand > 0 && (
                    <ResultRow
                      label="Range/Oven Demand"
                      va={result.rangeDemand}
                      detail={`NEC 220.55 — ${inputs.rangeWatts <= 12000 ? "≤12 kW = 8,000 VA" : `${(inputs.rangeWatts / 1000).toFixed(1)} kW nameplate`}`}
                    />
                  )}

                  {result.dryerDemand > 0 && (
                    <ResultRow
                      label="Dryer Demand"
                      va={result.dryerDemand}
                      detail="NEC 220.54 — 5,000 VA minimum"
                    />
                  )}

                  {result.fixedApplianceDemand > 0 && (
                    <ResultRow
                      label="Fixed Appliances"
                      va={result.fixedApplianceDemand}
                      detail={
                        result.fixedApplianceCount >= 4
                          ? `${result.fixedApplianceCount} items × 75% demand factor = ${result.fixedApplianceDemand.toLocaleString()} VA`
                          : `${result.fixedApplianceCount} item${result.fixedApplianceCount > 1 ? "s" : ""} at 100%`
                      }
                    />
                  )}

                  {result.hvacDemand > 0 && (
                    <ResultRow
                      label={`HVAC — ${result.hvacSelected === "ac" ? "A/C (larger)" : "Heat (larger)"}`}
                      va={result.hvacDemand}
                      detail="NEC 220.60 — non-coincident, larger load only"
                    />
                  )}

                  {result.evDemand > 0 && (
                    <ResultRow label="EV Charger" va={result.evDemand} />
                  )}
                  {result.poolDemand > 0 && (
                    <ResultRow label="Pool Pump" va={result.poolDemand} />
                  )}
                  {result.hotTubDemand > 0 && (
                    <ResultRow label="Hot Tub / Spa" va={result.hotTubDemand} />
                  )}

                  <ResultRow
                    label="TOTAL CALCULATED LOAD"
                    va={result.totalVA}
                    bold
                    accent
                  />

                  <div className="pt-3 flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-300">
                      Total Amps (240V)
                    </span>
                    <span className="text-lg font-bold text-yellow-400 font-mono">
                      {result.totalAmps.toFixed(1)}A
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <div className="p-3 rounded-lg bg-amber-900/20 border border-amber-700/40 text-xs text-amber-300 leading-relaxed">
                <strong>⚠️ Reference only.</strong> This calculator uses the NEC Article 220
                Standard Method for single-family dwellings. Your AHJ may require the Optional
                Method (Art. 220.82) or have local amendments. Always verify with your local
                Authority Having Jurisdiction and submit the required load calculation form
                with your permit application.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Legal Disclaimers */}
      <LegalDisclaimer />
    </div>
  );
}
