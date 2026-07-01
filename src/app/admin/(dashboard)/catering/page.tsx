"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, Users } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EmptyState } from "@/components/admin/EmptyState";
import { getCateringRequests } from "@/lib/actions/catering";
import type { CateringRequest, CateringStatus } from "@/types/admin";

const STATUS_FILTERS: { label: string; value: CateringStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "New", value: "NEW" },
  { label: "Contacted", value: "CONTACTED" },
  { label: "Quoted", value: "QUOTED" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Completed", value: "COMPLETED" },
];

export default function CateringPage() {
  const [requests, setRequests] = useState<CateringRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState<CateringStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const load = () => {
    startTransition(async () => {
      const result = await getCateringRequests({
        status: statusFilter === "ALL" ? undefined : statusFilter,
        search: search || undefined,
      });
      setRequests(result.requests);
      setTotal(result.total);
    });
  };

  useEffect(() => { load(); }, [statusFilter]);

  return (
    <div className="space-y-5 max-w-[1200px]">
      <div>
        <h1 className="font-semibold text-[#111] text-lg" style={{ fontFamily: "var(--font-inter)" }}>Catering Requests</h1>
        <p className="text-sm text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{total} total requests</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-4">
        <form onSubmit={(e) => { e.preventDefault(); load(); }} className="flex gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              aria-label="Search catering requests"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, event type…"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] focus:bg-white transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>
          <button type="submit" className="px-4 py-2 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer" style={{ fontFamily: "var(--font-inter)" }}>
            Search
          </button>
        </form>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === f.value
                ? "bg-[#B54E32] text-white"
                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200">
          <EmptyState icon={Calendar} title="No requests found" description="No catering requests match your filters." />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((req) => (
            <Link
              key={req.id}
              href={`/admin/catering/${req.id}`}
              className="bg-white rounded-2xl border border-neutral-200 p-5 hover:border-[#B54E32]/30 hover:shadow-sm transition-all block"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="min-w-0">
                  <p className="font-semibold text-[#111] text-sm truncate" style={{ fontFamily: "var(--font-inter)" }}>{req.name}</p>
                  <p className="text-xs text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{req.phone}</p>
                </div>
                <StatusBadge status={req.status} type="catering" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-neutral-600" style={{ fontFamily: "var(--font-inter)" }}>
                  <Calendar size={12} className="shrink-0" />
                  <span>{req.eventType} · {req.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600" style={{ fontFamily: "var(--font-inter)" }}>
                  <Users size={12} className="shrink-0" />
                  <span>{req.guestCount} guests</span>
                </div>
                {req.budget && (
                  <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>Budget: {req.budget}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
