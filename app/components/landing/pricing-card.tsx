import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { WebsiteContent } from "@/src/lib/website-content";

type Plan = WebsiteContent["pricing"]["plans"][number];
type PricingLabels = WebsiteContent["pricing"]["featureLabels"];

type PricingCardProps = {
  plan: Plan;
  labels: PricingLabels;
};

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export function PricingCard({ plan, labels }: PricingCardProps) {
  const isPopular = plan.popular === true;
  const accent = plan.accent;
  const included = stringList(
    "includedFeatures" in plan ? plan.includedFeatures : undefined,
  );
  const excluded = stringList(
    "excludedFeatures" in plan ? plan.excludedFeatures : undefined,
  );
  const note =
    "note" in plan && typeof plan.note === "string" && plan.note.trim().length > 0
      ? plan.note
      : null;

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

          <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#9CA3AF]">
            {labels.included}
          </p>
          <ul className="mt-3 flex-1 space-y-2.5">
            {included.map((item) => (
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

          {excluded.length > 0 ? (
            <>
              <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                {labels.notIncluded}
              </p>
              <ul className="mt-3 flex-1 space-y-2.5">
                {excluded.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-snug text-[#9CA3AF]"
                  >
                    <span
                      className="mt-2 inline-flex size-1.5 shrink-0 rounded-full bg-[#6B7280]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {note ? (
            <p className="mt-5 text-xs leading-relaxed text-[#D1D5DB]">
              <span className="font-semibold text-[#9CA3AF]">{labels.note}:</span>{" "}
              {note}
            </p>
          ) : null}
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
