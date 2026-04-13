import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Package, MapPin, Zap } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SharedSpec {
  share_id: string;
  job_label: string;
  jurisdiction: string;
  city: string;
  result_data: {
    job: {
      label: string;
      requirements: string[];
      materials: { quantity: string; item: string; spec: string }[];
    };
    jurisdiction: string;
    generatedAt: string;
  };
  created_at: string;
  expires_at: string;
}

export default async function SharedSpecPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("shared_specs")
    .select("*")
    .eq("share_id", id)
    .single();

  if (error || !data) return notFound();

  const spec = data as SharedSpec;

  // Check expiration
  if (new Date(spec.expires_at) < new Date()) {
    return (
      <div className="min-h-screen bg-[hsl(222,47%,7%)] flex flex-col items-center justify-center text-center px-4">
        <p className="text-xl font-bold text-white mb-2">This link has expired</p>
        <p className="text-gray-400 mb-6">Shared specs expire after 90 days.</p>
        <Link href="/app" className="text-yellow-400 hover:text-yellow-300 font-medium">
          Open VoltSpec →
        </Link>
      </div>
    );
  }

  // Increment view count (fire-and-forget)
  supabase
    .from("shared_specs")
    .update({ view_count: (data.view_count ?? 0) + 1 })
    .eq("share_id", id)
    .then(() => {});

  const { job } = spec.result_data;
  const dateStr = new Date(spec.result_data.generatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[hsl(222,47%,7%)]">
      {/* Header */}
      <header className="border-b border-[hsl(217,33%,20%)] bg-[hsl(222,47%,8%)] px-4 py-4 flex items-center gap-3">
        <Image src="/logo-transparent.png" alt="VoltSpec" width={24} height={24} className="w-6 h-6" />
        <span className="text-lg font-bold text-white tracking-tight">
          Volt<span className="text-yellow-400">Spec</span>
        </span>
        <span className="text-xs text-gray-500 ml-1">Shared Spec</span>
        <Link
          href="/app"
          className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-gray-900 bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded-lg transition-colors"
        >
          Open VoltSpec
          <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Job title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{job.label}</h1>
          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-yellow-400" />
              {spec.result_data.jurisdiction}
            </span>
            <span>·</span>
            <span>{dateStr}</span>
            <span>·</span>
            <span className="text-yellow-400 font-medium">NEC 2026</span>
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">Requirements</h2>
          </div>
          <div className="space-y-2">
            {job.requirements.slice(0, 10).map((req, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="text-yellow-400 font-bold w-5 text-right shrink-0">{i + 1}.</span>
                <span className="text-gray-300">{req}</span>
              </div>
            ))}
            {job.requirements.length > 10 && (
              <p className="text-gray-500 text-sm pl-8">+ {job.requirements.length - 10} more requirements</p>
            )}
          </div>
        </div>

        {/* Materials preview */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">Materials ({job.materials.length} items)</h2>
          </div>
          <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl overflow-hidden">
            <div className="grid grid-cols-[50px_1fr_1fr] gap-2 px-4 py-2 bg-[hsl(217,33%,12%)] text-xs font-bold text-gray-400 uppercase">
              <span>Qty</span>
              <span>Item</span>
              <span>Spec</span>
            </div>
            {job.materials.slice(0, 15).map((mat, i) => (
              <div key={i} className={`grid grid-cols-[50px_1fr_1fr] gap-2 px-4 py-2.5 text-sm border-t border-[hsl(217,33%,18%)] ${i % 2 ? "bg-[hsl(222,47%,9%)]" : ""}`}>
                <span className="text-yellow-400 font-bold">{mat.quantity}</span>
                <span className="text-white font-medium">{mat.item}</span>
                <span className="text-gray-400 text-xs">{mat.spec}</span>
              </div>
            ))}
            {job.materials.length > 15 && (
              <div className="px-4 py-3 text-sm text-gray-500 border-t border-[hsl(217,33%,18%)]">
                + {job.materials.length - 15} more items
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[hsl(222,47%,10%)] border border-yellow-400/30 rounded-xl p-6 text-center">
          <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Generate your own specs</h3>
          <p className="text-gray-400 text-sm mb-4 max-w-md mx-auto">
            VoltSpec generates complete job packages with materials lists, blueprints, and Elliott Electric pricing for 74 jurisdictions.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 bg-yellow-400 hover:bg-yellow-300 px-6 py-3 rounded-lg transition-colors"
          >
            Try VoltSpec Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-gray-600 text-xs mt-6">
          ⚠️ Reference tool only — not engineering advice. Verify with your local AHJ.
        </p>
      </div>
    </div>
  );
}
