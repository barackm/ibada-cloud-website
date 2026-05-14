import Link from "next/link";
import { withLang } from "@/app/lib/routes";
import type { Locale } from "@/dictionaries/index";
import type { SeoPage } from "@/src/lib/seo/types";

type Props = {
  locale: Locale;
  page: SeoPage;
};

export function SeoPageView({ locale, page }: Props) {
  return (
    <main className="min-w-0 bg-[#111827] px-4 pb-16 pt-32 text-[#F9FAFB] sm:px-6 sm:pb-20 sm:pt-36">
      <article className="mx-auto w-full max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9CA3AF]">{page.heroEyebrow}</p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {page.title}
        </h1>
        <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-[#D1D5DB] sm:text-lg">
          {page.excerpt}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={withLang(page.cta.href, locale)}
            className="inline-flex rounded-lg bg-[#059669] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#047857]"
          >
            {page.cta.label}
          </Link>
          <Link
            href={withLang("/#pricing", locale)}
            className="inline-flex rounded-lg border border-[#6B7280]/45 px-5 py-3 text-sm font-semibold text-[#F9FAFB] transition hover:bg-white/5"
          >
            {locale === "fr" ? "Voir les tarifs" : "View pricing"}
          </Link>
        </div>

        <div className="mt-12 space-y-10">
          {page.sections.map((section) => (
            <section key={section.title} className="rounded-xl border border-white/10 bg-[#1F2937]/35 px-5 py-6 sm:px-6 sm:py-7">
              <h2 className="text-xl font-semibold tracking-tight text-[#F9FAFB] sm:text-2xl">{section.title}</h2>
              <div className="mt-4 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-pretty text-sm leading-relaxed text-[#D1D5DB] sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.bullets && section.bullets.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#E5E7EB] marker:text-[#6B7280] sm:text-base">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {page.relatedLinks.length > 0 ? (
          <section className="mt-12 rounded-xl border border-white/10 bg-[#111827]/70 px-5 py-6 sm:px-6">
            <h2 className="text-lg font-semibold text-[#F9FAFB] sm:text-xl">
              {locale === "fr" ? "Ressources associées" : "Related resources"}
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {page.relatedLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={withLang(link.href, locale)}
                    className="inline-flex text-sm font-medium text-[#D1D5DB] underline decoration-transparent underline-offset-4 transition hover:text-white hover:decoration-white/35"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  );
}
