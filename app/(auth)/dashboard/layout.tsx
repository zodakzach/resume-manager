"use client";

import type React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Brain, FileText, Settings, User as UserIcon } from "lucide-react";
import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { SignOutButton } from "@/components/sign-out";
import { api } from "@/convex/_generated/api";

const navigation = [
  { name: "My Information", href: "/dashboard", icon: UserIcon },
  { name: "Resumes", href: "/dashboard/resumes", icon: FileText },
  { name: "Analyzer", href: "/dashboard/analyzer", icon: Brain },
  { name: "Settings", href: "/dashboard/settings", icon: Settings }
];

function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const user = useQuery(api.auth.getCurrentUser);
  if (user === undefined) return null;
  if (user === null) return null;

  const { name, email, image } = user;
  const avatarSrc = image;
  const displayName = name || "User";

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  return (
    <Sidebar variant="inset" className="max-sm:w-[82%]">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 font-bold text-white">
            R
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Resume Manager</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2"
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="max-sm:text-sm">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  aria-label="User menu"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    {avatarSrc ? (
                      <AvatarImage src={avatarSrc} alt={displayName} />
                    ) : (
                      <AvatarFallback className="rounded-lg">
                        {displayName.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {displayName}
                    </span>
                    <span className="truncate text-xs">{email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      {avatarSrc ? (
                        <AvatarImage src={avatarSrc} alt={displayName} />
                      ) : (
                        <AvatarFallback className="rounded-lg">
                          {displayName.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {displayName}
                      </span>
                      <span className="truncate text-xs">{email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SignOutButton onClick={handleSignOut} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Suspense fallback={null}>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background/80 sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 rounded-xl border-b px-3 backdrop-blur sm:h-16 sm:px-4">
            <SidebarTrigger className="-ml-1" aria-label="Open sidebar" />
            <div className="flex flex-1 items-center gap-2">
              <ModeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="mx-auto w-full max-w-7xl p-3 sm:p-4 md:p-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </Suspense>
    </SidebarProvider>
  );
}
