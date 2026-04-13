/**
 * Trade branding — dynamic names, colors, and logos per trade.
 */

export interface TradeBrand {
  name: string;         // "VoltSpec" or "PlumbSpec"
  prefix: string;       // "Volt" or "Plumb"
  suffix: string;       // "Spec" (always the same)
  accentColor: string;  // Tailwind class for the accent
  accentHex: string;    // Hex for non-Tailwind contexts
  logo: string;         // Path to logo image
  icon: string;         // Emoji
  tagline: string;      // Short description
}

const TRADE_BRANDS: Record<string, TradeBrand> = {
  electrical: {
    name: "VoltSpec",
    prefix: "Volt",
    suffix: "Spec",
    accentColor: "text-yellow-400",
    accentHex: "#facc15",
    logo: "/logo-transparent.png",
    icon: "⚡",
    tagline: "Electrical Estimating Built for the Field",
  },
  plumbing: {
    name: "PlumbSpec",
    prefix: "Plumb",
    suffix: "Spec",
    accentColor: "text-blue-400",
    accentHex: "#60a5fa",
    logo: "/plumbspec-logo.svg",
    icon: "🔧",
    tagline: "Plumbing Estimating Built for the Field",
  },
};

const DEFAULT_BRAND = TRADE_BRANDS.electrical;

export function getTradeBrand(tradeId?: string): TradeBrand {
  return TRADE_BRANDS[tradeId ?? "electrical"] ?? DEFAULT_BRAND;
}
