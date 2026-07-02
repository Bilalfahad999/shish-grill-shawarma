"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, Plus, ExternalLink, ShoppingBag, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getOrders } from "@/lib/actions/orders";
import { getCateringRequests } from "@/lib/actions/catering";
import type { AdminOrder, CateringRequest } from "@/types/admin";

interface TopbarProps {
  userName: string;
  title: string;
}

const quickLinks = [
  { label: "View Orders", href: "/admin/orders" },
  { label: "Catering Requests", href: "/admin/catering" },
];

// Simple search index
const searchItems = [
  { label: "Dashboard", href: "/admin", group: "Pages" },
  { label: "Orders", href: "/admin/orders", group: "Pages" },
  { label: "Catering Requests", href: "/admin/catering", group: "Pages" },
  { label: "View Website", href: "/", group: "External" },
  { label: "View Menu Page", href: "/menu", group: "External" },
];

export function Topbar({ userName, title }: TopbarProps) {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [quickOpen, setQuickOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<AdminOrder[]>([]);
  const [newCatering, setNewCatering] = useState<CateringRequest[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const notifCount = pendingOrders.length + newCatering.length;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [orders, catering] = await Promise.all([
        getOrders({ status: "PENDING" }),
        getCateringRequests({ status: "NEW" }),
      ]);
      if (!cancelled) {
        setPendingOrders(orders.orders);
        setNewCatering(catering.requests);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const results = query
    ? searchItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : [];

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="h-14 lg:h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shrink-0">
        {/* Page title */}
        <h1 className="font-semibold text-[#111] text-base hidden lg:block" style={{ fontFamily: "var(--font-inter)" }}>
          {title}
        </h1>
        {/* Mobile spacer (mobile has fixed top bar for sidebar toggle) */}
        <div className="lg:hidden" />

        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 text-neutral-400 hover:bg-neutral-200 transition-colors text-sm cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
            aria-label="Open search"
          >
            <Search size={14} />
            <span className="hidden sm:inline text-xs">Search…</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono text-neutral-400 bg-white border border-neutral-200 rounded px-1 py-0.5 ml-1">⌘K</kbd>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label={`Notifications${notifCount > 0 ? ` — ${notifCount} unread` : ""}`}
            >
              <Bell size={16} />
              {notifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B54E32]" aria-hidden="true" />
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} aria-hidden="true" />
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl border border-neutral-200 shadow-lg z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-neutral-100">
                      <p className="text-sm font-semibold text-neutral-800" style={{ fontFamily: "var(--font-inter)" }}>Notifications</p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifCount === 0 ? (
                        <p className="px-4 py-6 text-sm text-neutral-400 text-center" style={{ fontFamily: "var(--font-inter)" }}>
                          You&apos;re all caught up.
                        </p>
                      ) : (
                        <>
                          {pendingOrders.map((order) => (
                            <Link
                              key={order.id}
                              href={`/admin/orders/${order.id}`}
                              onClick={() => setNotifOpen(false)}
                              className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 transition-colors"
                            >
                              <div className="w-7 h-7 rounded-lg bg-[#B54E32]/10 text-[#B54E32] flex items-center justify-center shrink-0 mt-0.5">
                                <ShoppingBag size={13} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm text-neutral-700 truncate" style={{ fontFamily: "var(--font-inter)" }}>
                                  New order from {order.customer.name}
                                </p>
                                <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>{order.orderRef}</p>
                              </div>
                            </Link>
                          ))}
                          {newCatering.map((req) => (
                            <Link
                              key={req.id}
                              href={`/admin/catering/${req.id}`}
                              onClick={() => setNotifOpen(false)}
                              className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 transition-colors"
                            >
                              <div className="w-7 h-7 rounded-lg bg-[#6E8B5C]/10 text-[#6E8B5C] flex items-center justify-center shrink-0 mt-0.5">
                                <Briefcase size={13} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm text-neutral-700 truncate" style={{ fontFamily: "var(--font-inter)" }}>
                                  New catering enquiry from {req.name}
                                </p>
                                <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>{req.eventType}</p>
                              </div>
                            </Link>
                          ))}
                        </>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Quick add */}
          <div className="relative">
            <button
              onClick={() => setQuickOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer"
              aria-label="Quick add"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Quick Add</span>
            </button>

            <AnimatePresence>
              {quickOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setQuickOpen(false)} aria-hidden="true" />
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-neutral-200 shadow-lg z-50 overflow-hidden"
                  >
                    {quickLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setQuickOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="border-t border-neutral-100">
                      <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-400 hover:bg-neutral-50 transition-colors"
                        style={{ fontFamily: "var(--font-inter)" }}
                        onClick={() => setQuickOpen(false)}
                      >
                        <ExternalLink size={13} />
                        View Website
                      </a>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-[#B54E32]/15 flex items-center justify-center text-[#B54E32] text-sm font-semibold shrink-0 cursor-default select-none" style={{ fontFamily: "var(--font-inter)" }} aria-label={`Signed in as ${userName}`}>
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Search dialog */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => { setSearchOpen(false); setQuery(""); }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -12 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 -translate-x-1/2 top-24 z-50 w-full max-w-lg bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden"
              role="dialog"
              aria-label="Search"
              aria-modal="true"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-100">
                <Search size={16} className="text-neutral-400 shrink-0" aria-hidden="true" />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, actions…"
                  className="flex-1 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                  aria-label="Search admin"
                />
                <kbd className="text-[10px] font-mono text-neutral-400 border border-neutral-200 rounded px-1.5 py-0.5" style={{ fontFamily: "var(--font-inter)" }}>ESC</kbd>
              </div>

              <div className="max-h-72 overflow-y-auto py-2">
                {query === "" ? (
                  searchItems.slice(0, 8).map((item) => (
                    <SearchItem key={item.href} item={item} onSelect={() => { setSearchOpen(false); setQuery(""); router.push(item.href); }} />
                  ))
                ) : results.length > 0 ? (
                  results.map((item) => (
                    <SearchItem key={item.href} item={item} onSelect={() => { setSearchOpen(false); setQuery(""); router.push(item.href); }} />
                  ))
                ) : (
                  <p className="px-4 py-6 text-sm text-neutral-400 text-center" style={{ fontFamily: "var(--font-inter)" }}>
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SearchItem({ item, onSelect }: { item: { label: string; href: string; group: string }; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-neutral-50 transition-colors text-left cursor-pointer"
    >
      <span className="text-sm text-neutral-700" style={{ fontFamily: "var(--font-inter)" }}>{item.label}</span>
      <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded" style={{ fontFamily: "var(--font-inter)" }}>{item.group}</span>
    </button>
  );
}
