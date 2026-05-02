import type { WebsiteContent } from "@/src/lib/website-content";
import { cn } from "@/lib/utils";

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
      out.push({ title: (raw as { title: string }).title, body: (raw as { body: string }).body });
    }
  }
  return out;
}

export function AboutSection({ about }: AboutSectionProps) {
  const highlights = parseHighlights(about);

  return (
    <section id={about.id} className="scroll-mt-28 border-b border-white/10 px-4 py-14 sm:px-5 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">{about.eyebrow}</p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-[#F9FAFB] sm:text-3xl md:text-4xl">
            {about.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-[#D1D5DB] sm:text-lg">{about.lead}</p>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-[#9CA3AF] sm:text-base sm:leading-relaxed">
            {about.body}
          </p>
        </div>

        {highlights.length > 0 ? (
          <ul className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {highlights.map((item) => (
              <li
                key={item.title}
                className={cn(
                  "rounded-xl border border-white/10 bg-[#111827]/40 px-5 py-5 sm:px-6 sm:py-6",
                )}
              >
                <h3 className="text-sm font-semibold text-[#F9FAFB] sm:text-base">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">{item.body}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
