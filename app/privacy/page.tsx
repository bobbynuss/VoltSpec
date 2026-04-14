import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "VoltSpec Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">
          Effective Date: April 14, 2026 &middot; Last Updated: April 14, 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed">
          <Section title="1. Who We Are">
            <p>
              VoltSpec (<a href="https://voltspec.online" className="text-yellow-400 hover:text-yellow-300">voltspec.online</a>)
              is operated by VoltSpec LLC. This Privacy Policy explains what information we
              collect, how we use it, and your choices. VoltSpec is an independent tool and is{" "}
              <strong className="text-white">
                not affiliated with Elliott Electric Supply, any utility company, or any
                manufacturer
              </strong>.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <h3 className="text-white font-medium mt-3 mb-2">Information you provide:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>
                <strong className="text-gray-300">Account information</strong> — email address
                and authentication credentials when you create an account (managed via Supabase Auth)
              </li>
              <li>
                <strong className="text-gray-300">Profile information</strong> — company name,
                phone number, and license number if you choose to add them
              </li>
              <li>
                <strong className="text-gray-300">Job inputs</strong> — ZIP code, city/jurisdiction
                selection, job type, panel type, and other configuration choices you make when
                generating estimates
              </li>
              <li>
                <strong className="text-gray-300">Saved projects</strong> — materials lists and
                job configurations you save to your account
              </li>
              <li>
                <strong className="text-gray-300">Uploaded files</strong> — electrical plan images
                submitted through the AI Plan Takeoff feature
              </li>
              <li>
                <strong className="text-gray-300">Payment information</strong> — processed
                securely by Stripe; we do not store credit card numbers
              </li>
            </ul>

            <h3 className="text-white font-medium mt-4 mb-2">Information collected automatically:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>
                <strong className="text-gray-300">Usage analytics</strong> — page views, feature
                usage, and performance metrics via Vercel Analytics and Speed Insights
              </li>
              <li>
                <strong className="text-gray-300">Device information</strong> — browser type,
                operating system, and screen size (no device fingerprinting)
              </li>
              <li>
                <strong className="text-gray-300">Log data</strong> — IP address, request
                timestamps, and referring URLs (standard server logs)
              </li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use collected information to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>Generate electrical estimates, materials lists, and job packages</li>
              <li>Save and load your projects across sessions</li>
              <li>Process subscriptions and payments</li>
              <li>Detect your nearest Elliott Electric branch based on ZIP code</li>
              <li>Improve the Service — understand which features are used and fix issues</li>
              <li>Communicate with you about your account or the Service (e.g., support emails)</li>
            </ul>
            <p className="mt-3">
              We do <strong className="text-white">not</strong> sell, rent, or share your
              personal information with third parties for their marketing purposes.
            </p>
          </Section>

          <Section title="4. Third-Party Services">
            <p>
              We use the following third-party services that may process your data under their
              own privacy policies:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>
                <strong className="text-gray-300">Supabase</strong> — authentication and database
                hosting (<a href="https://supabase.com/privacy" className="text-yellow-400 hover:text-yellow-300">supabase.com/privacy</a>)
              </li>
              <li>
                <strong className="text-gray-300">Stripe</strong> — payment processing
                (<a href="https://stripe.com/privacy" className="text-yellow-400 hover:text-yellow-300">stripe.com/privacy</a>)
              </li>
              <li>
                <strong className="text-gray-300">Vercel</strong> — hosting, analytics, and
                speed insights (<a href="https://vercel.com/legal/privacy-policy" className="text-yellow-400 hover:text-yellow-300">vercel.com/legal/privacy-policy</a>)
              </li>
              <li>
                <strong className="text-gray-300">Anthropic (Claude)</strong> — AI-powered chat
                and plan takeoff features (<a href="https://www.anthropic.com/privacy" className="text-yellow-400 hover:text-yellow-300">anthropic.com/privacy</a>)
              </li>
            </ul>
          </Section>

          <Section title="5. Data Retention">
            <p>
              We retain your account data and saved projects for as long as your account is
              active. If you delete your account, we will delete your data within 30 days,
              except where we are required by law to retain it. Anonymous, aggregated usage
              analytics may be retained indefinitely.
            </p>
          </Section>

          <Section title="6. Data Security">
            <p>
              We use industry-standard security measures to protect your data, including
              encrypted connections (HTTPS), secure authentication, and access controls.
              However, no method of transmission over the internet is 100% secure. We cannot
              guarantee absolute security.
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              We use essential cookies for authentication and session management. Vercel
              Analytics may use cookies or similar technologies for performance measurement.
              We do not use third-party advertising cookies.
            </p>
          </Section>

          <Section title="8. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Export your saved projects</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:support@voltspec.online"
                className="text-yellow-400 hover:text-yellow-300"
              >
                support@voltspec.online
              </a>
              .
            </p>
          </Section>

          <Section title="9. Children">
            <p>
              The Service is not intended for use by anyone under the age of 18. We do not
              knowingly collect personal information from children.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on
              this page with an updated effective date. Continued use of the Service after
              changes constitutes acceptance of the revised policy.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              Questions about this Privacy Policy? Contact us at{" "}
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
