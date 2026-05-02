import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { WebsiteContent } from "@/src/lib/website-content";

type Plan = WebsiteContent["pricing"]["plans"][number];

type PricingCardProps = {
  plan: Plan;
};

export function PricingCard({ plan }: PricingCardProps) {
  const isPopular = plan.popular === true;
  const accent = plan.accent;

  return (
    <article
      className={cn(
        "relative flex h-full min-h-[24rem] flex-col rounded-2xl border p-5 sm:min-h-[26rem] sm:p-6 lg:min-h-[28rem]",
        isPopular
          ? "border-[#F59E0B]/40 bg-[#1F2937]/85 shadow-[0_20px_60px_-40px_rgba(245,158,11,0.55)]"
          : accent === "green"
            ? "border-[#059669]/28 bg-[#1F2937]/55"
            : "border-[#374151] bg-[#1F2937]/45"
      )}
    >
      {isPopular ? (
        <div className="absolute -top-2.5 left-1/2 z-[1] -translate-x-1/2 sm:-top-3">
          <span className="inline-flex rounded-full border border-[#F59E0B]/35 bg-[#111827] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#F59E0B]">
            {plan.popularLabel ?? "Popular"}
          </span>
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col">
          <h3 className="text-lg font-semibold text-[#F9FAFB] sm:text-xl">
            {plan.name}
          </h3>
          <p className="mt-1 text-sm font-medium leading-snug text-[#059669]">
            {plan.tagline}
          </p>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-1.5 gap-y-1 border-t border-[#374151] pt-5">
            <span className="text-3xl font-semibold tracking-tight text-[#F9FAFB] sm:text-[2rem]">
              {plan.priceDisplay}
            </span>
            <span className="text-sm text-[#9CA3AF]">{plan.priceNote}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[#D1D5DB] sm:text-[0.9375rem]">
            {plan.description}
          </p>

          <ul className="mt-5 flex-1 space-y-2.5">
            {plan.cardFeatures.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-sm leading-snug text-[#E5E7EB]"
              >
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-[#059669]"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 shrink-0">
          <Button
            asChild
            size="lg"
            className={cn(
              "h-11 w-full rounded-lg text-sm font-semibold",
              isPopular
                ? "bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90 hover:text-white"
                : "bg-[#059669] text-white hover:bg-[#059669]/90"
            )}
          >
            <Link href={plan.cta.href}>{plan.cta.label}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
