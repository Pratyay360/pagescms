"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "../components/ui/button.tsx";
import { GithubAuthExpired } from "../components/github-auth-expired.tsx";
import { isGithubAuthError } from "../lib/github-auth.ts";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "../components/ui/empty.tsx";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  if (isGithubAuthError(error)) {
    return <GithubAuthExpired />;
  }

  return (
    <Empty className="absolute inset-0 border-0 rounded-none">
      <EmptyHeader>
        <EmptyTitle>Something went wrong</EmptyTitle>
        <EmptyDescription>{error.message}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Link className={buttonVariants({ variant: "default" })} href="/">
          Go home
        </Link>
        <button className={buttonVariants({ variant: "outline" })} onClick={reset}>
          Try again
        </button>
      </EmptyContent>
    </Empty>
  );
}
