"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PLATFORM_LOGO_COMPACT_DARK_URL,
  PLATFORM_LOGO_COMPACT_LIGHT_URL,
  PLATFORM_LOGO_HORIZONTAL_DARK_URL,
  PLATFORM_LOGO_HORIZONTAL_LIGHT_URL,
} from "@/app/lib/brand";
import type { WebsiteContent } from "@/src/lib/website-content";
import type { Locale } from "@/dictionaries/index";
import { LanguageSwitcher } from "@/app/components/language-switcher";
import { withLang } from "@/app/lib/routes";

type HeaderProps = {
  navigation: WebsiteContent["navigation"];
  lang: Locale;
};

export function Header({ navigation, lang }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "pointer-events-auto mx-auto flex w-full max-w-6xl items-center gap-2 rounded-2xl border border-[#9CA3AF]/15 bg-[#111827]/80 px-3 py-2.5 shadow-lg shadow-black/20 backdrop-blur-xl sm:gap-3 sm:px-4 sm:py-3"
        )}
      >
        <Link
          href={withLang("/", lang)}
          className="flex min-w-0 shrink max-w-[min(100%,18rem)] items-center gap-2 md:max-w-none md:shrink-0"
          onClick={() => setOpen(false)}
        >
          <span className="sr-only">Ibada Cloud home</span>
          <Image
            src={PLATFORM_LOGO_HORIZONTAL_LIGHT_URL}
            alt=""
            width={400}
            height={90}
            className="h-9 w-auto max-w-full object-contain object-left sm:h-10 max-md:block md:hidden dark:hidden"
            sizes="(max-width:768px) 288px"
            unoptimized
          />
          <Image
            src={PLATFORM_LOGO_HORIZONTAL_DARK_URL}
            alt=""
            width={400}
            height={90}
            className="hidden h-9 w-auto max-w-full object-contain object-left sm:h-10 max-md:dark:block md:hidden"
            sizes="(max-width:768px) 288px"
            unoptimized
          />
          <Image
            src={PLATFORM_LOGO_COMPACT_LIGHT_URL}
            alt=""
            width={160}
            height={160}
            className="hidden h-7 w-auto md:block dark:md:hidden"
            sizes="128px"
            unoptimized
          />
          <Image
            src={PLATFORM_LOGO_COMPACT_DARK_URL}
            alt=""
            width={160}
            height={160}
            className="hidden h-7 w-auto md:dark:block"
            sizes="128px"
            unoptimized
          />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 md:flex lg:gap-1"
          aria-label="Primary"
        >
          {navigation.links.map((link) => (
            <Link
              key={link.href + link.label}
              href={withLang(link.href, lang)}
              className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-[#D1D5DB] transition hover:bg-white/5 hover:text-[#F9FAFB] lg:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher lang={lang} />

          <Button
            asChild
            size="lg"
            className="hidden sm:inline-flex whitespace-nowrap"
          >
            <Link href={withLang(navigation.cta.href, lang)}>{navigation.cta.label}</Link>
          </Button>

          <button
            type="button"
            className="inline-flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-xl border border-[#9CA3AF]/25 bg-[#1F2937]/90 text-[#F9FAFB] transition-colors hover:bg-[#1F2937] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? navigation.mobileCloseLabel : navigation.mobileMenuLabel}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "pointer-events-auto mx-auto mt-2 w-full max-w-6xl overflow-hidden rounded-2xl border bg-[#111827]/95 shadow-xl backdrop-blur-xl transition-[max-height,opacity,border-color] duration-200 ease-out md:hidden",
          open
            ? "max-h-[min(24rem,calc(100vh-6rem))] border-[#9CA3AF]/15 opacity-100"
            : "max-h-0 border-transparent opacity-0"
        )}
      >
        <nav
          className="flex max-h-[min(24rem,calc(100vh-6rem))] flex-col gap-0.5 overflow-y-auto px-3 py-3"
          aria-label="Mobile primary"
        >
          {navigation.links.map((link) => (
            <Link
              key={link.href + link.label}
              href={withLang(link.href, lang)}
              className="min-h-11 rounded-lg px-3 py-2.5 text-base font-medium text-[#D1D5DB] active:bg-white/10 hover:bg-white/5 hover:text-[#F9FAFB]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Button asChild size="lg" className="h-11 w-full text-sm">
              <Link
                href={withLang(navigation.cta.href, lang)}
                onClick={() => setOpen(false)}
              >
                {navigation.cta.label}
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
