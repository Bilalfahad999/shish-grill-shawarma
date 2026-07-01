"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useUser } from "@/context/UserContext";
import { UserSignInCard } from "@/components/ui/sign-in-card-2";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoggedIn, profile } = useUser();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>();

  // If already logged in, redirect
  if (isLoggedIn && profile) {
    router.replace("/account");
    return null;
  }

  const handleSubmit = async (email: string, _password: string) => {
    setError(undefined);
    setIsPending(true);
    // TODO: replace with real credentials check when DB is connected
    await new Promise((r) => setTimeout(r, 1000));
    setIsPending(false);

    if (!email) {
      setError("Invalid email or password.");
      return;
    }

    // Restore profile from localStorage if it matches this email,
    // otherwise create a minimal session so the user lands on /account to complete their profile.
    const stored = localStorage.getItem("shish_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.profile?.email === email) {
          login(parsed.profile);
          const next = searchParams.get("next") ?? "/";
          router.push(next);
          return;
        }
      } catch {}
    }

    // New login — create a basic profile and ask them to fill in details
    login({ name: "", email, phone: "", address: { street: "", suburb: "", state: "", postcode: "" } });
    router.push("/signup/profile");
  };

  return <UserSignInCard onSubmit={handleSubmit} isPending={isPending} error={error} />;
}
