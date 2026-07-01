"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useUser } from "@/context/UserContext";
import { ProfileForm } from "@/components/ui/profile-form";
import type { DeliveryAddress } from "@/types/user";

export default function ProfileSetupPage() {
  return (
    <Suspense>
      <ProfileSetupForm />
    </Suspense>
  );
}

function ProfileSetupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, profile, updateProfile } = useUser();

  useEffect(() => {
    if (!isLoggedIn) router.replace("/signup");
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !profile) return null;

  const next = searchParams.get("next") ?? "/";

  const handleSave = async (phone: string, address: DeliveryAddress) => {
    await new Promise((r) => setTimeout(r, 800));
    updateProfile({ phone, address });
    router.push(next);
  };

  const handleSkip = () => {
    router.push(next);
  };

  return (
    <ProfileForm
      mode="setup"
      initialValues={profile}
      onSave={handleSave}
      onSkip={handleSkip}
    />
  );
}
