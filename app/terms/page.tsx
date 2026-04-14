import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "VoltSpec Terms of Service — rules and conditions for using the VoltSpec estimating tool.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[hsl(222,47%,7%)] text-gray-300">
      {/* Header */}
      <header className="border-b border-[hsl(217,33%,20%)] bg-[hsl(222,47%,8%)] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white tracking-tight">
            Volt<span className="text-yellow-400">Spec</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
          >
            ← Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">
          Effective Date: April 14, 2026 &middot; Last Updated: April 14, 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed">
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using VoltSpec (the &ldquo;Service&rdquo;), located at{" "}
              <a href="https://voltspec.online" className="text-yellow-400 hover:text-yellow-300">
                voltspec.online
              </a>
              , you agree to be bound by these Terms of Service. If you do not agree, do not
              use the Service. The Service is provided by VoltSpec LLC (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p>
              VoltSpec is an electrical job specification and estimating tool that generates
              materials lists, blueprints, and PDF job packages. The Service is intended as a
              reference and planning aid for licensed electrical contractors and qualified
              professionals.
            </p>
          </Section>

          <Section title="3. No Affiliation">
            <p>
              VoltSpec is an independent tool developed by VoltSpec LLC.{" "}
              <strong className="text-white">
                VoltSpec is not affiliated with, endorsed by, or sponsored by Elliott Electric
                Supply, any electrical distributor, any utility company, or any manufacturer
              </strong>
              . All product names, logos, and brands referenced within the Service are the
              property of their respective owners and are used for identification purposes only.
            </p>
          </Section>

          <Section title="4. Estimates Only — No Guarantees">
            <p>
              All material lists, pricing, availability, part numbers, and specifications
              displayed by the Service are{" "}
              <strong className="text-white">estimates only</strong>. Pricing is approximate and
              derived from historical data — it does not reflect real-time pricing, your account
              discounts, or current stock availability.
            </p>
            <p className="mt-3">
              You must always verify current pricing, stock, and specifications with your local
              Elliott Electric Supply branch or other supplier before ordering materials.
            </p>
          </Section>

          <Section title="5. User Responsibility">
            <p>
              You are solely responsible for:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>Verifying compliance with all applicable local, state, and national electrical codes (including NEC)</li>
              <li>Meeting all utility company requirements and local Authority Having Jurisdiction (AHJ) regulations</li>
              <li>Confirming material quantities, specifications, and suitability for your specific job-site conditions</li>
              <li>Obtaining all required permits and inspections</li>
              <li>Ensuring all work is performed by qualified, licensed electrical professionals</li>
            </ul>
            <p className="mt-3">
              VoltSpec does not replace the judgment of a licensed electrical contractor or
              engineer. The Service is a reference tool — not engineering advice, not a
              substitute for professional assessment, and not a guarantee of code compliance.
            </p>
          </Section>

          <Section title="6. Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law,{" "}
              <strong className="text-white">
                VoltSpec LLC and its officers, directors, employees, agents, and affiliates
                shall not be liable for any direct, indirect, incidental, special,
                consequential, or punitive damages
              </strong>{" "}
              arising out of or relating to your use of (or inability to use) the Service.
              This includes, without limitation, damages for errors or omissions in materials
              lists, pricing inaccuracies, code compliance failures, property damage, personal
              injury, or any other losses — regardless of whether we have been advised of the
              possibility of such damages.
            </p>
            <p className="mt-3">
              In no event shall our total liability exceed the amount you paid for the Service
              in the twelve (12) months preceding the claim, or $100, whichever is less.
            </p>
          </Section>

          <Section title="7. No Warranties">
            <p>
              The Service is provided{" "}
              <strong className="text-white">
                &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo;
              </strong>{" "}
              without warranties of any kind, whether express or implied, including but not
              limited to implied warranties of merchantability, fitness for a particular
              purpose, accuracy, or non-infringement. We do not warrant that the Service will
              be uninterrupted, error-free, or free of harmful components.
            </p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>
              All content, features, and functionality of the Service — including text, code,
              designs, logos, and documentation — are owned by VoltSpec LLC and protected by
              applicable intellectual property laws. You may not copy, modify, distribute,
              sell, or create derivative works from the Service without our written permission.
            </p>
          </Section>

          <Section title="9. Account and Subscription">
            <p>
              Some features require account creation and/or a paid subscription. You are
              responsible for maintaining the security of your account credentials. Subscription
              terms, pricing, and billing are managed through Stripe. You may cancel your
              subscription at any time through your account settings.
            </p>
          </Section>

          <Section title="10. Invite Codes">
            <p>
              Access codes distributed by VoltSpec or its representatives are non-transferable
              unless explicitly stated otherwise. We reserve the right to revoke or deactivate
              any invite code at any time without notice.
            </p>
          </Section>

          <Section title="11. Modifications">
            <p>
              We reserve the right to modify these Terms at any time. Changes will be posted on
              this page with an updated effective date. Continued use of the Service after
              changes constitutes acceptance of the revised Terms.
            </p>
          </Section>

          <Section title="12. Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              State of Texas, without regard to conflict of law principles. Any disputes arising
              from these Terms or the Service shall be resolved in the courts of Travis County,
              Texas.
            </p>
          </Section>

          <Section title="13. Contact">
            <p>
              Questions about these Terms? Contact us at{" "}
              <a
                href="mailto:support@voltspec.online"
                className="text-yellow-400 hover:text-yellow-300"
              >
                support@voltspec.online
              </a>
              .
            </p>
          </Section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[hsl(217,33%,18%)] bg-[hsl(222,47%,8%)] px-6 py-6 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} VoltSpec LLC &middot;{" "}
          <Link href="/terms" className="text-gray-400 hover:text-yellow-400 transition-colors">
            Terms of Service
          </Link>{" "}
          &middot;{" "}
          <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-white mb-3">{title}</h2>
      {children}
    </section>
  );
}
