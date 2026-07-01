"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { ProfileForm } from "@/components/ui/profile-form";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { User, MapPin, Phone, Mail, LogOut, ChevronRight } from "lucide-react";
import type { DeliveryAddress } from "@/types/user";

export default function AccountPage() {
  const router = useRouter();
  const { isLoggedIn, profile, updateProfile, logout } = useUser();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login?next=/account");
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !profile) return null;

  const handleSave = async (phone: string, address: DeliveryAddress) => {
    await new Promise((r) => setTimeout(r, 700));
    updateProfile({ phone, address });
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const hasAddress = profile.address?.street;

  if (editing) {
    return (
      <ProfileForm
        mode="edit"
        initialValues={profile}
        onSave={handleSave}
      />
    );
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-[#FAF7F2] pt-28 pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto space-y-5"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#B54E32] flex items-center justify-center shrink-0">
                <span className="text-white text-2xl font-heading font-semibold">
                  {profile.name?.[0]?.toUpperCase() ?? "U"}
                </span>
              </div>
              <div>
                <h1 className="font-heading text-3xl font-light text-[#2F2F2F]">
                  {profile.name || "My Account"}
                </h1>
                <p className="font-body text-sm text-[#6B6355]">{profile.email}</p>
              </div>
            </div>

            {/* Info cards */}
            <InfoCard icon={Mail} label="Email" value={profile.email} />
            <InfoCard
              icon={Phone}
              label="Mobile"
              value={profile.phone || "Not set"}
              missing={!profile.phone}
            />
            <InfoCard
              icon={MapPin}
              label="Delivery Address"
              value={
                hasAddress
                  ? [
                      profile.address.street,
                      profile.address.suburb,
                      profile.address.state,
                      profile.address.postcode,
                    ]
                      .filter(Boolean)
                      .join(", ")
                  : "Not set"
              }
              missing={!hasAddress}
            />

            {/* Edit button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setEditing(true)}
              className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-[#B54E32] text-white font-body font-medium text-sm hover:bg-[#D96C2F] transition-colors duration-200 cursor-pointer mt-2"
            >
              <span className="flex items-center gap-2">
                <User size={16} />
                Edit Delivery Details
              </span>
              <ChevronRight size={16} />
            </motion.button>

            {/* Sign out */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border border-[#E5DDD0] text-[#6B6355] font-body text-sm hover:border-red-300 hover:text-red-500 transition-colors duration-200 cursor-pointer"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </motion.div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  missing,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  missing?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 px-5 py-4 rounded-2xl bg-white border border-[#E5DDD0]">
      <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={16} className="text-[#B54E32]" />
      </div>
      <div className="min-w-0">
        <p className="font-body text-xs text-[#6B6355] uppercase tracking-wide mb-0.5">{label}</p>
        <p className={`font-body text-sm ${missing ? "text-[#B54E32]/70 italic" : "text-[#2F2F2F]"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
