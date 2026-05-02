import Image from "next/image";
import Link from "next/link";
import { InView } from "@/app/components/motion";
import {
  PLATFORM_LOGO_COMPACT_DARK_URL,
  PLATFORM_LOGO_COMPACT_LIGHT_URL,
  PLATFORM_SITE_URL,
} from "@/app/lib/brand";
import type { WebsiteContent } from "@/src/lib/website-content";
import type { Locale } from "@/dictionaries/index";
import { withLang } from "@/app/lib/routes";

type FooterProps = {
  footer: WebsiteContent["footer"];
  lang: Locale;
};

function siteHostname(): string {
  try {
    return new URL(PLATFORM_SITE_URL).hostname.replace(/^www\./, "");
  } catch {
    return "ibadacloud.com";
  }
}

export function Footer({ footer, lang }: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = footer.copyright.replace("{year}", String(year));

  const pageLinks = footer.links.filter(
    (item) => !item.href.trim().toLowerCase().startsWith("mailto:"),
  );
  const mailtoLinks = footer.links.filter((item) =>
    item.href.trim().toLowerCase().startsWith("mailto:"),
  );

  return (
    <footer id={footer.id} className="relative bg-[#080d14]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#059669]/50"
        aria-hidden
      />
      <div className="border-t border-white/10 px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-14">
        <div className="mx-auto max-w-6xl">
          <InView className="grid gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
            <div className="lg:col-span-5">
              <Link
                href={withLang("/", lang)}
                className="inline-flex rounded-md outline-none ring-offset-[#080d14] focus-visible:ring-2 focus-visible:ring-[#059669]/50"
              >
                <span className="sr-only">Ibada Cloud</span>
                <Image
                  src={PLATFORM_LOGO_COMPACT_LIGHT_URL}
                  alt=""
                  width={160}
                  height={160}
                  className="h-9 w-auto dark:hidden sm:h-10"
                  sizes="(max-width: 640px) 120px, 144px"
                  unoptimized
                />
                <Image
                  src={PLATFORM_LOGO_COMPACT_DARK_URL}
                  alt=""
                  width={160}
                  height={160}
                  className="hidden h-9 w-auto dark:block sm:h-10"
                  sizes="(max-width: 640px) 120px, 144px"
                  unoptimized
                />
              </Link>
              <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-[#9CA3AF] sm:mt-6">
                {footer.description}
              </p>
              <a
                href={PLATFORM_SITE_URL}
                className="mt-4 inline-block text-xs text-[#6B7280] transition hover:text-[#9CA3AF]"
                rel="noopener noreferrer"
              >
                {siteHostname()}
              </a>
            </div>

            <div className="flex flex-col gap-10 sm:flex-row sm:gap-14 lg:col-span-4 lg:gap-16">
              <nav className="min-w-0 sm:flex-1" aria-label="Footer links">
                <ul className="space-y-2.5">
                  {pageLinks.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={withLang(item.href, lang)}
                        className="text-sm text-[#D1D5DB] transition hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              {mailtoLinks.length > 0 ? (
                <nav className="min-w-0 sm:flex-1" aria-label="Footer actions">
                  <ul className="space-y-2.5">
                    {mailtoLinks.map((item) => (
                      <li key={item.href + item.label}>
                        <a
                          href={item.href}
                          className="inline-flex items-center gap-1 text-sm font-medium text-[#059669] transition hover:text-[#34d399]"
                        >
                          {item.label}
                          <span aria-hidden>↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-xl border border-white/10 bg-[#111827]/60 p-5 sm:p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
                  {footer.contactLabel}
                </p>
                <a
                  href={`mailto:${footer.contactEmail}`}
                  className="mt-3 block break-all text-sm font-semibold text-[#F9FAFB] transition hover:text-[#059669]"
                >
                  {footer.contactEmail}
                </a>
            </div>
          </div>
        </InView>

          <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-xs text-[#6B7280] sm:mt-12 sm:flex-row sm:justify-between sm:pt-8">
            <p>{copyright}</p>
            <Link
              href={withLang("/#top", lang)}
              className="font-medium text-[#9CA3AF] transition hover:text-[#F9FAFB]"
            >
              {footer.backToTopLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
