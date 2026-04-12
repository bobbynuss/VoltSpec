import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VoltSpec — Electrical Estimating for Contractors",
    template: "%s | VoltSpec",
  },
  description:
    "Generate NEC 2026 materials lists, SVG blueprints, and professional PDF job packages with real Elliott Electric Supply pricing. 29 job types across 74 jurisdictions in 14 states — 204 Elliott branches covered.",
  metadataBase: new URL("https://voltspec.online"),
  keywords: [
    "electrical estimating",
    "electrical estimating software",
    "NEC 2026",
    "materials list",
    "electrician tool",
    "Elliott Electric Supply",
    "panel upgrade",
    "service upgrade",
    "EV charger installation",
    "electrical permit",
    "electrical takeoff",
    "electrical blueprint",
    "contractor estimating tool",
    "VoltSpec",
  ],
  authors: [{ name: "VoltSpec" }],
  creator: "VoltSpec",
  publisher: "VoltSpec",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://voltspec.online",
    siteName: "VoltSpec",
    title: "VoltSpec — Electrical Estimating for Contractors",
    description:
      "Generate NEC 2026 materials lists, SVG blueprints, and professional PDF job packages with real Elliott Electric Supply pricing. 29 job types, 74 jurisdictions, 14 states.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VoltSpec — Electrical Estimating for Contractors",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoltSpec — Electrical Estimating for Contractors",
    description:
      "NEC 2026 materials lists, blueprints, and job packages with real Elliott Electric pricing. 29 job types, 74 jurisdictions, 14 states.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://voltspec.online",
  },
  icons: {
    icon: [
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#0f172a",
    "theme-color": "#facc15",
  },
};

import { AuthProvider } from "@/components/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
