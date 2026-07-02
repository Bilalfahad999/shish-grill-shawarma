"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ShoppingBag, Briefcase,
  User, LogOut, ChevronLeft, Menu, X,
} from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";
import { Logo } from "@/components/Logo";

const navSections = [
  {
    label: "Overview",
    items: [{ href: "/admin", icon: LayoutDashboard, label: "Dashboard" }],
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/orders", icon: ShoppingBag, label: "Orders" },
      { href: "/admin/catering", icon: Briefcase, label: "Catering" },
    ],
  },
];

export function Sidebar({ userName, userRole }: { userName: string; userRole: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo + collapse */}
      <div className={`flex items-center ${collapsed ? "justify-center px-3" : "justify-between px-5"} h-16 border-b border-white/8 shrink-0`}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <Logo variant="mark" size={32} className="w-8 h-8 rounded-lg shrink-0" />
            <div>
              <p className="text-white text-sm font-semibold leading-tight" style={{ fontFamily: "var(--font-inter)" }}>Shish Admin</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="hidden lg:flex w-7 h-7 rounded-lg items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft size={15} className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2" aria-label="Admin navigation">
        {navSections.map((section) => (
          <div key={section.label} className="mb-5">
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase text-white/25" style={{ fontFamily: "var(--font-inter)" }}>
                {section.label}
              </p>
            )}
            <ul role="list" className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 group relative ${
                        active
                          ? "bg-white/10 text-white"
                          : "text-white/50 hover:text-white hover:bg-white/6"
                      } ${collapsed ? "justify-center" : ""}`}
                      style={{ fontFamily: "var(--font-inter)" }}
                      title={collapsed ? item.label : undefined}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-[#B54E32]" aria-hidden="true" />
                      )}
                      <item.icon size={16} className="shrink-0" aria-hidden="true" />
                      {!collapsed && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User + logout */}
      <div className={`shrink-0 border-t border-white/8 p-3 ${collapsed ? "" : ""}`}>
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-2 py-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-[#B54E32]/30 flex items-center justify-center text-[#D96C2F] shrink-0">
              <User size={14} />
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate" style={{ fontFamily: "var(--font-inter)" }}>{userName}</p>
              <p className="text-white/30 text-[10px] truncate" style={{ fontFamily: "var(--font-inter)" }}>{userRole}</p>
            </div>
          </div>
        )}
        <form action={logoutAction}>
          <button
            type="submit"
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/8 transition-all cursor-pointer ${collapsed ? "justify-center" : ""}`}
            title={collapsed ? "Sign Out" : undefined}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <LogOut size={15} className="shrink-0" aria-hidden="true" />
            {!collapsed && <span className="text-sm">Sign Out</span>}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 60 : 220 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="hidden lg:flex flex-col h-screen bg-[#111111] border-r border-white/8 overflow-hidden shrink-0 sticky top-0"
        aria-label="Admin sidebar"
      >
        <NavContent />
      </motion.aside>

      {/* Mobile: top bar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#111111] border-b border-white/8 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Logo variant="mark" size={28} className="w-7 h-7 rounded-md" />
          <span className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Shish Admin</span>
        </div>
        <button onClick={() => setMobileOpen(true)} className="text-white/60 hover:text-white transition-colors cursor-pointer" aria-label="Open menu">
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50 bg-[#111111] border-r border-white/8"
              aria-label="Mobile admin navigation"
            >
              <div className="flex items-center justify-between px-5 h-14 border-b border-white/8">
                <span className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-inter)" }}>Navigation</span>
                <button onClick={() => setMobileOpen(false)} className="text-white/40 hover:text-white transition-colors cursor-pointer" aria-label="Close menu">
                  <X size={18} />
                </button>
              </div>
              <div className="h-[calc(100%-3.5rem)] overflow-y-auto">
                <NavContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
