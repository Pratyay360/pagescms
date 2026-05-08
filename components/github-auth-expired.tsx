"use client";

import { useState } from "react";
import { signOut } from "../lib/auth-client.ts";
import { getSafeRedirect } from "../lib/auth-redirect.ts";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "./ui/empty.tsx";
import { Button } from "./ui/button.tsx";
import { ArrowLeft, Loader } from "lucide-react";

const GithubAuthExpired = () => {
  const [loading, setLoading] = useState(false);

  const handleSignInAgain = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await signOut();
    } finally {
      const returnTo = getSafeRedirect(
        `${globalThis.location.pathname}${globalThis.location.search}`,
      );
      const signInUrl = returnTo && returnTo !== "/sign-in"
        ? `/sign-in?redirect=${encodeURIComponent(returnTo)}`
        : "/sign-in";
      globalThis.location.assign(signInUrl);
    }
  };

  return (
    <Empty className="absolute inset-0 border-0 rounded-none">
      <EmptyHeader>
        <EmptyTitle>GitHub session expired</EmptyTitle>
        <EmptyDescription>
          Your GitHub session has expired. You&apos;ll need to sign in again.
        </EmptyDescription>
        <Button variant="ghost" onClick={handleSignInAgain} disabled={loading}>
          <ArrowLeft className="size-4" />
          Sign in another way
          {loading && <Loader className="size-4 animate-spin" />}
        </Button>
      </EmptyHeader>
    </Empty>
  );
};

export { GithubAuthExpired };
