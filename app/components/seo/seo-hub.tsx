import Link from "next/link";
import { withLang } from "@/app/lib/routes";
import type { Locale } from "@/dictionaries/index";
import type { SeoPage } from "@/src/lib/seo/types";

type Props = {
  locale: Locale;
  title: string;
  description: string;
  pages: SeoPage[];
};

export function SeoHubView({ locale, title, description, pages }: Props) {
  return (
    <main className="min-w-0 bg-[#111827] px-4 pb-16 pt-32 text-[#F9FAFB] sm:px-6 sm:pb-20 sm:pt-36">
      <section className="mx-auto w-full max-w-5xl">
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-[#D1D5DB] sm:text-lg">
          {description}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => {
            const path = page.route === "platform" ? "/platform" : `/${page.route}/${page.slug}`;
            return (
              <Link
                key={page.route + page.slug}
                href={withLang(path, locale)}
                className="rounded-xl border border-white/10 bg-[#1F2937]/45 px-5 py-5 transition hover:border-[#059669]/55 hover:bg-[#1F2937]/70"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9CA3AF]">
                  {page.intent}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-[#F9FAFB]">{page.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#D1D5DB]">{page.excerpt}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
