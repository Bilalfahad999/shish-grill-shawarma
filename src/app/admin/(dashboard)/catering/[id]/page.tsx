import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Users, DollarSign, Download } from "lucide-react";
import { getCateringRequest } from "@/lib/actions/catering";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { CateringStatusUpdater } from "./CateringStatusUpdater";

export default async function CateringDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const req = await getCateringRequest(id);
  if (!req) notFound();

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/catering" className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer">
          <ArrowLeft size={14} />
        </Link>
        <div>
          <h1 className="font-semibold text-[#111] text-base" style={{ fontFamily: "var(--font-inter)" }}>{req.name}</h1>
          <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>
            Received {new Date(req.createdAt).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={`/api/admin/catering/${req.id}/pdf`}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Download size={12} /> PDF
          </a>
          <StatusBadge status={req.status} type="catering" size="md" />
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5">
        <h2 className="font-semibold text-sm text-[#111] mb-3" style={{ fontFamily: "var(--font-inter)" }}>Contact</h2>
        <div className="space-y-2">
          <a href={`tel:${req.phone}`} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-[#B54E32] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
            <Phone size={13} /> {req.phone}
          </a>
          {req.email && (
            <a href={`mailto:${req.email}`} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-[#B54E32] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
              <Mail size={13} /> {req.email}
            </a>
          )}
        </div>
      </div>

      {/* Event details */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5">
        <h2 className="font-semibold text-sm text-[#111] mb-3" style={{ fontFamily: "var(--font-inter)" }}>Event Details</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: Calendar, label: "Event Type", value: req.eventType },
            { icon: Calendar, label: "Date & Time", value: `${req.date} at ${req.time}` },
            { icon: Users, label: "Guest Count", value: req.guestCount },
            { icon: DollarSign, label: "Budget", value: req.budget ?? "Not specified" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2">
              <Icon size={13} className="mt-0.5 text-neutral-400 shrink-0" />
              <div>
                <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>{label}</p>
                <p className="text-sm text-neutral-700" style={{ fontFamily: "var(--font-inter)" }}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {req.collectionType === "delivery" && req.venueAddress && (
          <div className="flex items-start gap-2 mt-3 pt-3 border-t border-neutral-100">
            <MapPin size={13} className="mt-0.5 text-neutral-400 shrink-0" />
            <div>
              <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>Venue Address</p>
              <p className="text-sm text-neutral-700" style={{ fontFamily: "var(--font-inter)" }}>{req.venueAddress}</p>
            </div>
          </div>
        )}

        {req.specialRequests && (
          <div className="mt-3 pt-3 border-t border-neutral-100">
            <p className="text-xs text-neutral-400 mb-1" style={{ fontFamily: "var(--font-inter)" }}>Special Requests</p>
            <p className="text-sm text-neutral-700 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{req.specialRequests}</p>
          </div>
        )}
      </div>

      <CateringStatusUpdater requestId={req.id} currentStatus={req.status} adminNotes={req.adminNotes ?? undefined} />
    </div>
  );
}
