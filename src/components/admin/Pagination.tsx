"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center gap-1" role="navigation" aria-label="Pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft size={14} />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            aria-current={p === page ? "page" : undefined}
            className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              p === page
                ? "bg-[#B54E32] text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
