import type { WebsiteContent } from "@/src/lib/website-content";
import { InView, InViewList, InViewListItem } from "@/app/components/motion";

type AboutSectionProps = {
  about: WebsiteContent["about"];
};

type Highlight = { title: string; body: string };

function parseHighlights(about: WebsiteContent["about"]): Highlight[] {
  if (!("highlights" in about) || !Array.isArray(about.highlights)) return [];
  const out: Highlight[] = [];
  for (const raw of about.highlights) {
    if (
      raw !== null &&
      typeof raw === "object" &&
      "title" in raw &&
      "body" in raw &&
      typeof (raw as { title: unknown }).title === "string" &&
      typeof (raw as { body: unknown }).body === "string"
    ) {
      out.push({
        title: (raw as { title: string }).title,
        body: (raw as { body: string }).body,
      });
    }
  }
  return out;
}

export function AboutSection({ about }: AboutSectionProps) {
  const highlights = parseHighlights(about);

  return (
    <section
      id={about.id}
      className="relative scroll-mt-28 overflow-hidden px-4 py-16 sm:px-5 sm:py-20 md:py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[#080d14]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(5,150,105,0.09),transparent_60%)]"
        aria-hidden
      />
      {/* Top hairline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading block */}
        <InView className="mx-auto max-w-2xl text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#9CA3AF] sm:text-xs">
            {about.eyebrow}
          </p>
          <div
            className="mx-auto mt-3 h-px w-12 bg-gradient-to-r from-transparent via-[#059669]/70 to-transparent"
            aria-hidden
          />
          <h2 className="mt-6 text-balance text-2xl font-semibold tracking-tight text-[#F3F4F6] sm:text-3xl md:text-[2.5rem] md:leading-[1.1]">
            {about.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#D1D5DB] sm:text-lg">
            {about.lead}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-[#6B7280] sm:text-base">
            {about.body}
          </p>
        </InView>

        {/* Highlight cards */}
        {highlights.length > 0 && (
          <InViewList className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-5">
            {highlights.map((item, i) => (
              <InViewListItem
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f1621]/80 px-6 py-7 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]"
              >
                {/* Top accent line */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#059669]/55 to-transparent"
                  aria-hidden
                />
                <span className="text-[0.65rem] font-semibold tabular-nums tracking-[0.15em] text-[#059669]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-[#E5E7EB] sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{item.body}</p>
              </InViewListItem>
            ))}
          </InViewList>
        )}
      </div>

      {/* Bottom hairline */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />
    </section>
  );
}
