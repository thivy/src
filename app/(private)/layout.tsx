import { AuthenticatingSkeleton } from "@/components/ui/loading-skeleton";
import { GuardWithAuth } from "@/features/auth/auth-guard";
import { SidebarAppLayout } from "@/features/root/app-layout";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Azure Chat",
  description: "A chat application powered by Azure AI Foundry",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<AuthenticatingSkeleton />}>
      <GuardWithAuth>
        <SidebarAppLayout>{children}</SidebarAppLayout>
      </GuardWithAuth>
    </Suspense>
  );
}
