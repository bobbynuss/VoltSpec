import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VoltSpec — Electrical Estimating Tool for Texas",
    template: "%s | VoltSpec",
  },
  description:
    "Generate NEC 2026 materials lists, SVG blueprints, and professional PDF job packages with real Elliott Electric Supply pricing. 21 job types across 12 Texas jurisdictions — Austin, San Antonio, Houston, Dallas/DFW, and more.",
  metadataBase: new URL("https://voltspec.online"),
  keywords: [
    "electrical estimating",
    "NEC 2026",
    "materials list",
    "electrician tool",
    "Texas electrical",
    "Elliott Electric Supply",
    "panel upgrade",
    "service upgrade",
    "EV charger installation",
    "electrical permit",
    "Austin Energy",
    "CPS Energy",
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
    title: "VoltSpec — Electrical Estimating Tool for Texas",
    description:
      "Generate NEC 2026 materials lists, SVG blueprints, and professional PDF job packages with real Elliott Electric Supply pricing. 21 job types across 12 Texas jurisdictions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VoltSpec — Electrical Estimating Tool for Texas",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoltSpec — Electrical Estimating Tool for Texas",
    description:
      "NEC 2026 materials lists, blueprints, and job packages with real EES pricing. 21 job types, 12 Texas jurisdictions.",
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
      </body>
    </html>
  );
}
