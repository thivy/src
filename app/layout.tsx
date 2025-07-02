import { AppRoot } from "@/features/root/app-root";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Azure Chat",
  description: "Azure Chat powered by Azure AI Foundry",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppRoot>{children}</AppRoot>;
}
