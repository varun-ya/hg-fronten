import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import AppShell from "@/components/AppShell";

const seasonMix = localFont({
  src: [
    { path: "../fonts/SeasonMix-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/SeasonMix-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/SeasonMix-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/SeasonMix-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/SeasonMix-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-season-mix",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Student Dashboard | HomeGuru",
  description: "Student Learning Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={seasonMix.variable}>
      <body className="h-screen overflow-hidden bg-white" style={{ fontFamily: "var(--font-season-mix), sans-serif" }}>
        <SidebarProvider>
          <AppShell>{children}</AppShell>
        </SidebarProvider>
      </body>
    </html>
  );
}
