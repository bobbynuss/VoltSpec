import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VoltSpec — Under Construction",
  description: "VoltSpec is temporarily offline for improvements. Check back soon.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Logo / Brand */}
        <div className="space-y-2">
          <div className="text-5xl">⚡</div>
          <h1 className="text-4xl font-bold text-yellow-400 tracking-tight">
            VoltSpec
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Under Construction
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            We&apos;re making some improvements behind the scenes. 
            VoltSpec will be back online shortly.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800" />

        {/* Footer */}
        <p className="text-slate-500 text-sm">
          Questions? Reach out to{" "}
          <a
            href="mailto:support@voltspec.online"
            className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2"
          >
            support@voltspec.online
          </a>
        </p>
      </div>
    </div>
  );
}
