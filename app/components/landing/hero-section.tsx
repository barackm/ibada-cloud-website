import Image from "next/image";
import Link from "next/link";
import type { WebsiteContent } from "@/src/lib/website-content";
import type { Locale } from "@/dictionaries/index";
import { withLang } from "@/app/lib/routes";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  hero: WebsiteContent["hero"];
  lang: Locale;
};

/** Default hero bullets if `focusPoints` omitted from JSON. */
const HERO_FOCUS_POINTS_FALLBACK = [
  {
    title: "Structured membership",
    body: "Households, branches, and pastoral context stay organized as you grow.",
  },
  {
    title: "Operations & finances",
    body: "Activities, categories, and reporting that fits how churches actually work.",
  },
  {
    title: "Smart Forms",
    body: "Collect information once, route it cleanly, and reduce follow-up threads.",
  },
] as const;

type HeroFocusPoint = { title: string; body: string };

function heroFocusPoints(hero: WebsiteContent["hero"]): ReadonlyArray<HeroFocusPoint> {
  if (!("focusPoints" in hero) || !Array.isArray(hero.focusPoints) || hero.focusPoints.length === 0) {
    return HERO_FOCUS_POINTS_FALLBACK;
  }
  const out: HeroFocusPoint[] = [];
  for (const raw of hero.focusPoints) {
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
  return out.length > 0 ? out : HERO_FOCUS_POINTS_FALLBACK;
}

function HeroPreviewChrome() {
  return (
    <div className='relative flex h-11 shrink-0 items-center gap-3 border-b border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-transparent px-3.5 sm:h-12 sm:px-4'>
      <div className='flex gap-1.5' aria-hidden>
        <span className='size-2.5 rounded-full bg-[#ff5f57]/85 shadow-[0_0_6px_rgba(255,95,87,0.35)]' />
        <span className='size-2.5 rounded-full bg-[#febc2e]/85 shadow-[0_0_6px_rgba(254,188,46,0.28)]' />
        <span className='size-2.5 rounded-full bg-[#28c840]/85 shadow-[0_0_6px_rgba(40,200,64,0.28)]' />
      </div>
      <div className='flex min-w-0 flex-1 items-center justify-center gap-1 sm:justify-start sm:pl-1'>
        <span className='truncate rounded-full border border-transparent bg-transparent px-3 py-1 text-[11px] font-medium text-[#6B7280] sm:text-xs'>
          Members
        </span>
        <span className='relative truncate rounded-full border border-[#059669]/35 bg-[#059669]/12 px-3 py-1 text-[11px] font-semibold text-[#F9FAFB] shadow-[0_0_24px_-6px_rgba(5,150,105,0.55)] sm:text-xs'>
          Admin
          <span
            className='pointer-events-none absolute inset-x-2 -bottom-1 h-px bg-gradient-to-r from-transparent via-[#34d399]/80 to-transparent opacity-90'
            aria-hidden
          />
        </span>
      </div>
    </div>
  );
}

function CheckGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-5 shrink-0 text-[#34d399]", className)}
      viewBox='0 0 20 20'
      fill='currentColor'
      aria-hidden
    >
      <path
        fillRule='evenodd'
        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
        clipRule='evenodd'
      />
    </svg>
  );
}

function heroVisualMedia(hero: WebsiteContent["hero"]): {
  imageUrl: string | null;
  imageAlt: string;
} {
  if (
    !("visual" in hero) ||
    hero.visual === null ||
    hero.visual === undefined ||
    typeof hero.visual !== "object" ||
    Array.isArray(hero.visual)
  ) {
    return { imageUrl: null, imageAlt: "" };
  }
  const rec = hero.visual as Record<string, unknown>;
  const imageUrl = typeof rec.imageUrl === "string" ? rec.imageUrl : null;
  const imageAlt = typeof rec.imageAlt === "string" ? rec.imageAlt : "";
  return { imageUrl, imageAlt };
}

export function HeroSection({ hero, lang }: HeroSectionProps) {
  const { imageUrl, imageAlt } = heroVisualMedia(hero);
  const focusPoints = heroFocusPoints(hero);

  const tertiary =
    "tertiaryCta" in hero &&
    hero.tertiaryCta &&
    typeof hero.tertiaryCta === "object" &&
    "label" in hero.tertiaryCta &&
    "href" in hero.tertiaryCta
      ? hero.tertiaryCta
      : null;

  const heroTopPad =
    "pt-[calc(5.75rem+env(safe-area-inset-top))] sm:pt-[calc(6.25rem+env(safe-area-inset-top))] lg:pt-[calc(6.5rem+env(safe-area-inset-top))]";

  return (
    <section id='top' className='relative overflow-hidden bg-[#070a10] pb-0 text-[#F9FAFB]'>
      {/* Grid begins below the floating header so it doesn’t read “under” the nav */}
      <div
        className='pointer-events-none absolute inset-x-0 bottom-0 top-24 opacity-90 sm:top-28'
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.038) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.038) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%), radial-gradient(ellipse 78% 58% at 50% 12%, black 22%, transparent 68%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%), radial-gradient(ellipse 78% 58% at 50% 12%, black 22%, transparent 68%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
        aria-hidden
      />
      <div
        className='pointer-events-none absolute inset-x-0 top-0 h-[min(52vh,28rem)] bg-[radial-gradient(ellipse_85%_70%_at_50%_0%,rgba(5,150,105,0.16),transparent_72%)]'
        aria-hidden
      />
      <div
        className='pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111827]'
        aria-hidden
      />

      <div className={cn("relative z-10 mx-auto max-w-6xl px-4 sm:px-6", heroTopPad, "pb-12 sm:pb-16 lg:pb-20")}>
        <div className='mx-auto max-w-2xl text-center'>
          <p className='text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#9CA3AF] sm:text-xs'>
            {hero.eyebrow}
          </p>
          <div
            className='mx-auto mt-3 h-px w-12 bg-gradient-to-r from-transparent via-[#059669]/70 to-transparent'
            aria-hidden
          />

          <h1
            className={cn(
              "mx-auto mt-6 max-w-[15ch] text-balance text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.032em] min-[400px]:max-w-lg sm:mt-7 sm:max-w-2xl sm:text-4xl sm:leading-[1.08] md:text-[2.75rem] md:leading-[1.06]",
              "text-[#F3F4F6]",
            )}
          >
            {hero.headline}
          </h1>

          <p className='mx-auto mt-5 max-w-lg text-pretty text-sm leading-relaxed text-[#9CA3AF] sm:mt-6 sm:text-base sm:leading-7'>
            {hero.description}
          </p>

          <div className='mt-7 flex justify-center sm:mt-9'>
            <div
              className={cn(
                "inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 py-1 pl-3 pr-1",
                "bg-[#111827]/50 shadow-sm ring-1 ring-white/[0.06] sm:gap-2.5 sm:py-1 sm:pl-3.5 sm:pr-1",
              )}
            >
              <Link
                href={withLang(hero.secondaryCta.href, lang)}
                className={cn(
                  "shrink py-1 pr-2.5 text-left text-xs font-medium whitespace-nowrap text-[#F9FAFB] outline-none",
                  "transition-colors hover:text-white",
                  "focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-[#059669]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070a10]",
                  "sm:py-1.5 sm:pr-3.5 sm:text-sm",
                )}
              >
                {hero.secondaryCta.label}
              </Link>
              <Link
                href={withLang(hero.primaryCta.href, lang)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-center text-xs font-semibold whitespace-nowrap text-white outline-none",
                  "bg-[#059669] transition-colors hover:bg-[#047857] active:bg-[#065f46]",
                  "focus-visible:ring-2 focus-visible:ring-[#6ee7b7]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070a10]",
                  "sm:px-4 sm:py-2 sm:text-sm",
                )}
              >
                {hero.primaryCta.label}
              </Link>
            </div>
          </div>

          {tertiary ? (
            <Link
              href={withLang(tertiary.href, lang)}
              className='mt-8 inline-flex max-w-prose flex-wrap items-center justify-center gap-2 text-left text-sm leading-snug text-[#6B7280] underline-offset-4 transition-colors hover:text-[#E5E7EB]'
            >
              <span>{tertiary.label}</span>
              <span aria-hidden className='font-medium text-[#34d399]'>
                →
              </span>
            </Link>
          ) : null}
        </div>

        {!imageUrl && focusPoints.length > 0 ? (
          <div className='relative mx-auto mt-14 max-w-5xl sm:mt-16'>
            <div
              className='absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] via-transparent to-transparent opacity-80 blur-sm sm:rounded-3xl'
              aria-hidden
            />
            <div className='relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0c121c]/75 shadow-[0_24px_80px_-50px_rgba(0,0,0,0.85)] backdrop-blur-[2px] sm:rounded-3xl'>
              <div
                className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(5,150,105,0.12),transparent_62%)]'
                aria-hidden
              />
              <div className='relative grid gap-8 px-6 py-9 sm:grid-cols-3 sm:gap-6 sm:px-10 sm:py-10'>
                {focusPoints.map((item) => (
                  <div key={item.title} className='flex gap-3.5 text-left sm:flex-col sm:gap-3'>
                    <CheckGlyph className='mt-0.5 sm:mt-0' />
                    <div className='min-w-0'>
                      <p className='text-sm font-semibold text-[#E5E7EB]'>{item.title}</p>
                      <p className='mt-1.5 text-sm leading-relaxed text-[#9CA3AF]'>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {imageUrl ? (
          <div className='relative mx-auto mt-16 max-w-6xl sm:mt-20 lg:mt-24'>
            <div className='pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#070a10] to-transparent sm:h-20' />

            <div className='mx-auto max-w-5xl [perspective:1600px]'>
              <div className='relative origin-top [transform-style:preserve-3d] will-change-transform lg:[transform:rotateX(5deg)]'>
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0e14]/95 shadow-[0_-36px_90px_-32px_rgba(5,150,105,0.2),0_28px_70px_-34px_rgba(0,0,0,0.88)]",
                    "ring-1 ring-white/[0.05] sm:rounded-3xl",
                    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-white/[0.06] before:via-transparent before:to-transparent before:opacity-40",
                  )}
                >
                  <div
                    className='pointer-events-none absolute -inset-1 rounded-[inherit] opacity-[0.32] blur-2xl'
                    style={{
                      background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(16,185,129,0.32), transparent 70%)",
                    }}
                    aria-hidden
                  />
                  <HeroPreviewChrome />
                  <div className='relative aspect-[16/10] w-full max-md:min-h-[260px] sm:aspect-[16/9] lg:aspect-[16/8]'>
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className='object-cover object-top'
                      sizes='(max-width: 768px) 100vw, 64rem'
                      priority
                    />
                    <div
                      className='pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070a10] via-transparent to-transparent opacity-45 sm:opacity-32'
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div
        className='pointer-events-none h-px bg-gradient-to-r from-transparent via-white/10 to-transparent'
        aria-hidden
      />
      <div className='h-8 bg-[#111827] sm:h-10' aria-hidden />
    </section>
  );
}
