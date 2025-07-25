"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Loading03Icon,
  Logout05Icon,
  UnfoldMoreIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { User } from "next-auth";
import { useState, useTransition } from "react";
import { signOutAndRedirect } from "./actions/nav-actions";
import { ThemeSwitcher } from "./nav-theme-switcher";

export function UserDropdown({ user }: { user: User }) {
  const { isMobile, open } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSignOut = (e: Event) => {
    e.preventDefault();
    startTransition(async () => {
      await signOutAndRedirect();
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu
          open={isOpen && !isPending}
          onOpenChange={(open) => {
            setIsOpen(open);
          }}
        >
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="items-center justify-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-6 rounded-full">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="rounded-full">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {open ? (
                <>
                  <div className="grid flex-1 gap-1 text-left text-sm leading-tight ">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs ">
                      {user.loginProvider}
                    </span>
                  </div>
                  <HugeiconsIcon icon={UnfoldMoreIcon} />
                </>
              ) : null}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-full">
                  <AvatarImage src={user.image!} alt={user.name!} />
                  <AvatarFallback className="rounded-full">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">
                    logged in with {user.loginProvider}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HugeiconsIcon icon={UserIcon} strokeWidth={1.5} />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleSignOut} disabled={isPending}>
                {isPending ? (
                  <>
                    <HugeiconsIcon icon={Loading03Icon} strokeWidth={1.5} />
                    Signing out...
                  </>
                ) : (
                  <>
                    <HugeiconsIcon strokeWidth={1.5} icon={Logout05Icon} />
                    Sign out
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <ThemeSwitcher />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
