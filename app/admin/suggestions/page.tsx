"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpCircle,
  Filter,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

interface Suggestion {
  id: string;
  suggested_by: string;
  project_id: string | null;
  store_id: string | null;
  jurisdiction: string | null;
  job_id: string;
  item_index: number;
  item_name: string;
  field_changed: string;
  old_value: string | null;
  new_value: string;
  status: "pending" | "approved" | "rejected";
  reviewed_by: string | null;
  reviewed_at: string | null;
  notes: string | null;
  created_at: string;
}

export default function AdminSuggestionsPage() {
  const { session } = useAuth();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected">(
    "pending"
  );
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.access_token}`,
  };

  const loadSuggestions = async () => {
    if (!session?.access_token) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/collaborate/suggest?status=${filter}`,
        { headers: authHeaders }
      );
      const data = await res.json();
      setSuggestions(data.suggestions ?? []);
    } catch (err) {
      console.error("Failed to load suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, session?.access_token]);

  const handleReview = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    setActionLoading(id);
    try {
      await fetch("/api/collaborate/suggest/review", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ suggestionId: id, status }),
      });
      // Remove from list
      setSuggestions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Review failed:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[hsl(222,47%,7%)] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin"
            className="text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <ArrowUpCircle className="w-6 h-6 text-amber-400" />
              Master Data Suggestions
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Review corrections submitted by Elliott sales reps
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6 bg-[hsl(222,47%,10%)] rounded-lg p-1 w-fit">
          {(["pending", "approved", "rejected"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer capitalize ${
                filter === status
                  ? status === "pending"
                    ? "bg-amber-400/20 text-amber-400"
                    : status === "approved"
                      ? "bg-green-400/20 text-green-400"
                      : "bg-red-400/20 text-red-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Suggestions list */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : suggestions.length === 0 ? (
          <div className="text-center py-16">
            <Filter className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">
              No {filter} suggestions
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions.map((s) => (
              <div
                key={s.id}
                className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,18%)] rounded-xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Item info */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-white bg-[hsl(217,33%,18%)] px-2 py-1 rounded">
                        {s.job_id}
                      </span>
                      {s.jurisdiction && (
                        <span className="text-xs text-gray-500">
                          {s.jurisdiction}
                        </span>
                      )}
                      {s.store_id && (
                        <span className="text-xs text-gray-600">
                          Store #{s.store_id}
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-medium text-white mb-1">
                      {s.item_name}
                      <span className="text-gray-500 font-normal ml-2">
                        (item #{s.item_index + 1}, {s.field_changed})
                      </span>
                    </p>

                    {/* Change diff */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-2">
                      {s.old_value && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-semibold text-red-400 uppercase">Old</span>
                          <code className="text-xs text-red-300/80 bg-red-400/10 px-2 py-1 rounded break-all">
                            {s.old_value}
                          </code>
                        </div>
                      )}
                      <span className="text-gray-600 hidden sm:inline">→</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold text-green-400 uppercase">New</span>
                        <code className="text-xs text-green-300/80 bg-green-400/10 px-2 py-1 rounded break-all">
                          {s.new_value}
                        </code>
                      </div>
                    </div>

                    {s.notes && (
                      <p className="text-xs text-gray-500 mt-2 italic">
                        Note: {s.notes}
                      </p>
                    )}

                    <p className="text-[10px] text-gray-600 mt-2">
                      <Clock className="w-2.5 h-2.5 inline mr-1" />
                      {formatTime(s.created_at)}
                    </p>
                  </div>

                  {/* Action buttons */}
                  {filter === "pending" && (
                    <div className="flex flex-col gap-2 shrink-0">
                      <Button
                        size="sm"
                        onClick={() => handleReview(s.id, "approved")}
                        disabled={actionLoading === s.id}
                        className="bg-green-600 hover:bg-green-500 text-white text-xs h-9 px-4"
                      >
                        <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReview(s.id, "rejected")}
                        disabled={actionLoading === s.id}
                        className="border-red-500/40 text-red-400 hover:text-red-300 text-xs h-9 px-4"
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1.5" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {filter === "approved" && (
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-500/50" />
                      <span className="text-[9px] text-green-500/50">Approved</span>
                    </div>
                  )}
                  {filter === "rejected" && (
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <XCircle className="w-5 h-5 text-red-500/50" />
                      <span className="text-[9px] text-red-500/50">Rejected</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
