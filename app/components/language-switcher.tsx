"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/dictionaries/index";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
};

type Props = {
  lang: Locale;
};

export function LanguageSwitcher({ lang }: Props) {
  const pathname = usePathname();

  function hrefForLocale(target: Locale): string {
    // pathname is e.g. "/en" or "/en/about" — replace the first segment
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || "/";
  }

  return (
    <div
      role="navigation"
      aria-label="Language"
      className={cn(
        "flex gap-0.5 border",
        /* Mobile: match 44px menu control */
        "max-md:h-11 max-md:min-h-11 max-md:items-stretch max-md:rounded-xl max-md:border-[#9CA3AF]/25 max-md:bg-[#1F2937]/90 max-md:p-1",
        /* Desktop: compact strip */
        "md:items-center md:rounded-lg md:border-[#9CA3AF]/20 md:bg-[#1F2937]/60 md:p-0.5"
      )}
    >
      {locales.map((locale) => {
        const active = locale === lang;
        return (
          <Link
            key={locale}
            href={hrefForLocale(locale)}
            aria-current={active ? "page" : undefined}
            aria-label={locale === "en" ? "English" : "Français"}
            className={cn(
              "flex items-center justify-center rounded-md text-center text-[0.7rem] font-semibold tracking-wider uppercase transition-colors",
              "max-md:min-w-9 max-md:flex-1 max-md:px-2",
              "md:min-w-8 md:flex-none md:px-2 md:py-1",
              active
                ? "bg-[#374151] text-[#F9FAFB] shadow-sm"
                : "text-[#6B7280] hover:text-[#D1D5DB]"
            )}
          >
            {LOCALE_LABELS[locale]}
          </Link>
        );
      })}
    </div>
  );
}
