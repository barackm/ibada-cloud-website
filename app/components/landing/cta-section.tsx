import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { WebsiteContent } from "@/src/lib/website-content";
import type { Locale } from "@/dictionaries/index";
import { withLang } from "@/app/lib/routes";
import { InView } from "@/app/components/motion";

type CtaSectionProps = {
  cta: WebsiteContent["cta"];
  lang: Locale;
};

export function CtaSection({ cta, lang }: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden border-y border-white/10 px-4 py-14 sm:px-5 sm:py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[#070b12]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_50%_115%,rgba(16,185,129,0.11),transparent_50%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />

      <InView className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-[#F9FAFB] sm:text-3xl">
          {cta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#D1D5DB] sm:text-lg">
          {cta.description}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
          <Button
            asChild
            size="lg"
            className="h-11 rounded-lg bg-[#059669] px-6 text-sm font-semibold text-white hover:bg-[#059669]/90 sm:h-12 sm:min-w-[12rem]"
          >
            <Link href={withLang(cta.primaryCta.href, lang)}>{cta.primaryCta.label}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 rounded-lg border-[#6B7280]/45 bg-transparent px-6 text-sm font-semibold text-[#F9FAFB] hover:bg-white/[0.06] sm:h-12 sm:min-w-[12rem]"
          >
            <Link href={withLang(cta.secondaryCta.href, lang)}>{cta.secondaryCta.label}</Link>
          </Button>
        </div>
      </InView>
    </section>
  );
}
