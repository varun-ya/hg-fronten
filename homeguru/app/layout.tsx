import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const seasonMix = localFont({
  src: [
    { path: "./fonts/seasonmix/SeasonMix-TRIAL-Light.otf", weight: "300" },
    { path: "./fonts/seasonmix/SeasonMix-TRIAL-Regular.otf", weight: "400" },
    { path: "./fonts/seasonmix/SeasonMix-TRIAL-Medium.otf", weight: "500" },
    { path: "./fonts/seasonmix/SeasonMix-TRIAL-SemiBold.otf", weight: "600" },
    { path: "./fonts/seasonmix/SeasonMix-TRIAL-Bold.otf", weight: "700" },
  ],
  variable: "--font-season-mix",
});

const matter = localFont({
  src: [
    { path: "./fonts/matter/Matter-TRIAL-Light.otf", weight: "300" },
    { path: "./fonts/matter/Matter-TRIAL-Regular.otf", weight: "400" },
    { path: "./fonts/matter/Matter-TRIAL-Medium.otf", weight: "500" },
    { path: "./fonts/matter/Matter-TRIAL-SemiBold.otf", weight: "600" },
    { path: "./fonts/matter/Matter-TRIAL-Bold.otf", weight: "700" },
  ],
  variable: "--font-matter",
});

export const metadata: Metadata = {
  title: "HomeGuru - Dashboard",
  description: "Your perfect tutor, matched by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${seasonMix.variable} ${matter.variable} font-matter`}>{children}</body>
    </html>
  );
}
