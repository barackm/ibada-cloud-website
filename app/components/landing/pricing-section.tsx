import type { WebsiteContent } from "@/src/lib/website-content";
import { PricingCard } from "./pricing-card";
import { InView, InViewGrid, InViewGridItem } from "@/app/components/motion";

type PricingSectionProps = {
  pricing: WebsiteContent["pricing"];
};

export function PricingSection({ pricing }: PricingSectionProps) {
  return (
    <section
      id={pricing.id}
      className="border-b border-[#9CA3AF]/10 px-4 py-14 sm:px-5 sm:py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <InView className="mx-auto max-w-2xl px-0 text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-[#F9FAFB] sm:text-3xl md:text-4xl">
            {pricing.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#D1D5DB] sm:text-lg">
            {pricing.subtitle}
          </p>
        </InView>

        <InViewGrid className="mt-10 grid w-full grid-cols-1 gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-2 xl:grid-cols-4 lg:items-stretch">
          {pricing.plans.map((plan) => (
            <InViewGridItem key={plan.id}>
              <PricingCard plan={plan} labels={pricing.featureLabels} />
            </InViewGridItem>
          ))}
        </InViewGrid>
      </div>
    </section>
  );
}
