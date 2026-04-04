import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoltSpec — Electrical Code & Job Package Generator",
  description:
    "Professional NEC 2026 code requirements, materials, and job packages for electricians. Austin, San Antonio, Houston, and Dallas/DFW jurisdictions.",
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
