"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useUser } from "@/context/UserContext";
import { UserSignUpCard } from "@/components/ui/sign-in-card-2";

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
}

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useUser();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (name: string, email: string, _password: string) => {
    setError(undefined);
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsPending(false);

    if (!name || !email) {
      setError("Something went wrong. Please try again.");
      return;
    }

    login({
      name,
      email,
      phone: "",
      address: { street: "", suburb: "", state: "", postcode: "" },
    });

    // Forward ?next so profile setup can redirect there after completing
    const next = searchParams.get("next");
    const profileUrl = next ? `/signup/profile?next=${encodeURIComponent(next)}` : "/signup/profile";
    router.push(profileUrl);
  };

  return <UserSignUpCard onSubmit={handleSubmit} isPending={isPending} error={error} />;
}
