import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; href?: string; onClick?: () => void };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
        <Icon size={28} className="text-neutral-400" aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-neutral-800 text-base mb-1" style={{ fontFamily: "var(--font-inter)" }}>
        {title}
      </h3>
      <p className="text-sm text-neutral-400 max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
        {description}
      </p>
      {action && (
        <div className="mt-5">
          {action.href ? (
            <Link
              href={action.href}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {action.label}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
