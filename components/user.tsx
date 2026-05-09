"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useUser } from "../contexts/user-context.tsx";
import { signOut } from "../lib/auth-client.ts";
import { getInitialsFromName } from "../lib/utils/avatar.ts";
import { Button } from "./ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.tsx";
import { cn } from "../lib/utils.ts";
import { ArrowUpRight, LogOut, Settings } from "lucide-react";

export function User({
  className,
  onClick,
  align = "end",
}: {
  className?: string;
  onClick?: () => void;
  align?: "start" | "center" | "end";
}) {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className={cn(className, "rounded-full")}
        >
          <Avatar className="size-6">
            <AvatarImage
              src={user?.githubUsername
                ? `https://github.com/${user.githubUsername}.png`
                : `https://unavatar.io/${user?.email}?fallback=false`}
              alt={user?.name || user.email}
            />
            <AvatarFallback>
              {getInitialsFromName(user.name ?? undefined)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent forceMount align={align} className="max-w-[12.5rem]">
        <DropdownMenuLabel>
          <div className="text-sm font-medium truncate">
            {user.name || user.githubUsername || user.email}
          </div>
          <div className="text-xs font-normal text-muted-foreground truncate">
            {user.email}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="w-40 text-xs text-muted-foreground font-medium">
          Theme
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light" onClick={onClick}>
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" onClick={onClick}>
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" onClick={onClick}>
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={async () => {
            if (onClick) onClick();
            await signOut();
            globalThis.location.assign("/sign-in");
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
