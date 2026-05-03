import type { Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { defaultLocale } from "@/dictionaries/index";
import { PLATFORM_BRAND_COLOR, PLATFORM_LIGHT_BACKGROUND } from "./lib/brand";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DARK_PAGE_BACKGROUND = "#111827";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: PLATFORM_LIGHT_BACKGROUND },
    { media: "(prefers-color-scheme: dark)", color: DARK_PAGE_BACKGROUND },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const h = await headers();
  const lang = h.get("x-lang") ?? defaultLocale;

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={cn(
        "dark h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
