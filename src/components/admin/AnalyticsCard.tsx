import type { LucideIcon } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; up: boolean };
  color?: "default" | "terracotta" | "sage" | "orange";
}

const colorMap = {
  default: "bg-neutral-100 text-neutral-500",
  terracotta: "bg-[#B54E32]/10 text-[#B54E32]",
  sage: "bg-[#6E8B5C]/10 text-[#6E8B5C]",
  orange: "bg-[#D96C2F]/10 text-[#D96C2F]",
};

export function AnalyticsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "default",
}: AnalyticsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>
          {title}
        </p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={18} aria-hidden="true" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>{value}</p>
        {subtitle && (
          <p className="text-xs text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{subtitle}</p>
        )}
      </div>
      {trend && (
        <div className={`inline-flex items-center gap-1 text-xs font-medium ${trend.up ? "text-[#6E8B5C]" : "text-red-500"}`} style={{ fontFamily: "var(--font-inter)" }}>
          <span>{trend.up ? "↑" : "↓"}</span>
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  );
}
