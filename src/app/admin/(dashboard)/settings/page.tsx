"use client";

import { useState, useTransition, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { getSettings, saveSettings } from "@/lib/actions/content";
import type { RestaurantSettings } from "@/types/admin";

export default function SettingsPage() {
  const [settings, setSettings] = useState<RestaurantSettings | null>(null);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    startTransition(async () => {
      const data = await getSettings();
      setSettings(data);
    });
  }, []);

  const set = (key: keyof RestaurantSettings, value: string | number) =>
    setSettings((prev) => prev ? { ...prev, [key]: value } : prev);

  const save = () => {
    if (!settings) return;
    startTransition(async () => {
      await saveSettings(settings);
      toast.success("Settings saved");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const inputCls = "w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] focus:bg-white transition-colors";
  const label = (htmlFor: string, text: string) => <label htmlFor={htmlFor} className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>{text}</label>;

  if (!settings) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 size={20} className="animate-spin text-neutral-400" />
    </div>
  );

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="font-semibold text-[#111] text-lg" style={{ fontFamily: "var(--font-inter)" }}>Settings</h1>
        <p className="text-sm text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>Restaurant profile and configuration</p>
      </div>

      {/* Basic */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
        <h2 className="font-semibold text-sm text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>Restaurant Info</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>{label("set-name", "Restaurant Name")}<input id="set-name" type="text" value={settings.name} onChange={(e) => set("name", e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} /></div>
          <div>{label("set-phone", "Phone")}<input id="set-phone" type="tel" value={settings.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} /></div>
          <div>{label("set-email", "Email")}<input id="set-email" type="email" value={settings.email} onChange={(e) => set("email", e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} /></div>
          <div>{label("set-whatsapp", "WhatsApp Number")}<input id="set-whatsapp" type="text" value={settings.whatsappNumber ?? ""} onChange={(e) => set("whatsappNumber", e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} /></div>
        </div>
        <div>{label("set-address", "Address")}<input id="set-address" type="text" value={settings.address} onChange={(e) => set("address", e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} /></div>
        <div>{label("set-maps", "Google Maps URL")}<input id="set-maps" type="url" value={settings.googleMapsUrl ?? ""} onChange={(e) => set("googleMapsUrl", e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} /></div>
      </div>

      {/* Social */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
        <h2 className="font-semibold text-sm text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>Social Media</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>{label("set-instagram", "Instagram URL")}<input id="set-instagram" type="url" value={settings.instagramUrl ?? ""} onChange={(e) => set("instagramUrl", e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} placeholder="https://instagram.com/…" /></div>
          <div>{label("set-facebook", "Facebook URL")}<input id="set-facebook" type="url" value={settings.facebookUrl ?? ""} onChange={(e) => set("facebookUrl", e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} placeholder="https://facebook.com/…" /></div>
          <div>{label("set-tiktok", "TikTok URL")}<input id="set-tiktok" type="url" value={settings.tiktokUrl ?? ""} onChange={(e) => set("tiktokUrl", e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} placeholder="https://tiktok.com/@…" /></div>
        </div>
      </div>

      {/* Ordering */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
        <h2 className="font-semibold text-sm text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>Ordering</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>{label("set-delivery-fee", "Delivery Fee ($)")}<input id="set-delivery-fee" type="number" step="0.50" min="0" value={settings.deliveryFee} onChange={(e) => set("deliveryFee", parseFloat(e.target.value))} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} /></div>
          <div>{label("set-min-delivery", "Min. Delivery Order ($)")}<input id="set-min-delivery" type="number" step="1" min="0" value={settings.minDelivery} onChange={(e) => set("minDelivery", parseFloat(e.target.value))} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} /></div>
          <div>{label("set-prep-time", "Preparation Time (min)")}<input id="set-prep-time" type="number" step="5" min="5" value={settings.preparationTime} onChange={(e) => set("preparationTime", parseInt(e.target.value))} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} /></div>
          <div>{label("set-delivery-time", "Delivery Time (min)")}<input id="set-delivery-time" type="number" step="5" min="10" value={settings.deliveryTime} onChange={(e) => set("deliveryTime", parseInt(e.target.value))} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} /></div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
        <h2 className="font-semibold text-sm text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>SEO</h2>
        <div>{label("set-seo-title", "Page Title")}<input id="set-seo-title" type="text" value={settings.seoTitle ?? ""} onChange={(e) => set("seoTitle", e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} /></div>
        <div>{label("set-seo-desc", "Meta Description")}<textarea id="set-seo-desc" value={settings.seoDescription ?? ""} onChange={(e) => set("seoDescription", e.target.value)} rows={2} className={`${inputCls} resize-none`} style={{ fontFamily: "var(--font-inter)" }} /></div>
      </div>

      <button onClick={save} disabled={isPending} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer disabled:opacity-50" style={{ fontFamily: "var(--font-inter)" }}>
        {isPending ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
        {saved ? "Saved!" : "Save Settings"}
      </button>
    </div>
  );
}
