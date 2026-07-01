"use client";

import { useActionState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction } from "@/lib/actions/auth";
import { AdminSignInCard } from "@/components/ui/sign-in-card-2";

type FormState = { error?: string } | undefined;

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}

function AdminLoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [state, action, isPending] = useActionState<FormState, FormData>(
    loginAction,
    undefined
  );

  return (
    <AdminSignInCard
      action={action}
      isPending={isPending}
      error={state?.error}
      callbackUrl={callbackUrl}
    />
  );
}
