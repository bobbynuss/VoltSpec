import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoltSpec — Electrical Job Spec & Estimating Tool",
  description:
    "Professional NEC 2026 code requirements, materials lists, SVG blueprints, and job packages for electricians across Texas. Austin, San Antonio, Houston, Dallas/DFW, Amarillo, El Paso, Corpus Christi, Odessa, Abilene, and more.",
  metadataBase: new URL("https://voltspec.online"),
  openGraph: {
    title: "VoltSpec — Electrical Job Spec & Estimating Tool",
    description:
      "Professional NEC 2026 code requirements, materials lists, and job packages for Texas electricians.",
    url: "https://voltspec.online",
    siteName: "VoltSpec",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "VoltSpec — Electrical Job Spec & Estimating Tool",
    description:
      "NEC 2026 materials lists, blueprints, and job packages for Texas electricians.",
  },
  alternates: {
    canonical: "https://voltspec.online",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
