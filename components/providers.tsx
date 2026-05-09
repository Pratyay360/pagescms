"use client";

import { ThemeProvider } from "./theme-provider.tsx";
import { ActionToastProvider } from "../contexts/action-toast-context.tsx";
import { UserProvider } from "../contexts/user-context.tsx";
import { TooltipProvider } from "./ui/tooltip.tsx";
import { User } from "../types/user.ts";

export function Providers(
  { children, user }: { children: React.ReactNode; user: User | null },
) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <UserProvider user={user}>
        <TooltipProvider>
          <ActionToastProvider>{children}</ActionToastProvider>
        </TooltipProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
