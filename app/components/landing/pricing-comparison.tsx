"use client";

import { Fragment, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { WebsiteContent } from "@/src/lib/website-content";

type Plan = WebsiteContent["pricing"]["plans"][number];

type PricingComparisonProps = {
  comparison: WebsiteContent["pricingComparison"];
  plans: WebsiteContent["pricing"]["plans"];
};

type ComparisonRow = WebsiteContent["pricingComparison"]["rows"][number];

/** Desktop table intrinsic width (enabled only on lg+). */
const comparisonMinInner = "lg:min-w-[56rem]";
const comparisonGridCols =
  "grid w-full grid-cols-[minmax(10.5rem,30%)_repeat(3,minmax(0,1fr))]";
const stickyFeatureBg = "bg-[#111827]";

function Check() {
  return (
    <span
      className="inline-flex size-6 items-center justify-center rounded-full bg-[#059669]/15 text-[#34d399]"
      aria-hidden
    >
      <svg className="size-3.5" viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
      </svg>
    </span>
  );
}

function ExMark() {
  return (
    <span
      className="inline-flex size-6 items-center justify-center rounded-full bg-[#374151]/35 text-sm font-light text-[#9CA3AF]"
      aria-hidden
    >
      ×
    </span>
  );
}

function PlanCell({
  format,
  value,
}: {
  format: "boolean" | "text";
  value: boolean | string;
}) {
  return (
    <td className="border-b border-[#374151]/45 bg-transparent px-3 py-[1.125rem] text-center align-middle text-sm text-[#D1D5DB]">
      {format === "boolean" ? (
        value === true ? (
          <>
            <span className="sr-only">Included</span>
            <span className="flex justify-center">
              <Check />
            </span>
          </>
        ) : (
          <>
            <span className="sr-only">Not included</span>
            <span className="flex justify-center">
              <ExMark />
            </span>
          </>
        )
      ) : (
        <span className="text-sm leading-snug">{String(value)}</span>
      )}
    </td>
  );
}

function MobileValue({
  format,
  value,
}: {
  format: "boolean" | "text";
  value: boolean | string;
}) {
  if (format === "boolean") {
    const included = value === true;
    return (
      <span className="inline-flex items-center gap-2 text-sm text-[#D1D5DB]">
        {included ? <Check /> : <ExMark />}
      </span>
    );
  }

  return <span className="text-sm leading-relaxed text-[#D1D5DB]">{String(value)}</span>;
}

function PlanHeaderCard({
  plan,
  isGrowth,
  recommendedLabel,
}: {
  plan: Plan;
  isGrowth: boolean;
  recommendedLabel: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full min-h-33 flex-col justify-center rounded-xl border bg-[#1F2937] px-4 py-5 text-center",
        "shadow-[0_2px_12px_rgba(0,0,0,0.22)]",
        isGrowth
          ? "border-[#F59E0B]/40 shadow-[0_2px_16px_rgba(245,158,11,0.12)]"
          : "border-[#374151]/55",
      )}
    >
      <span className="text-base font-semibold text-[#F9FAFB]">{plan.name}</span>
      <p className="mt-2 text-sm leading-tight text-[#9CA3AF]">
        <span className="text-xl font-semibold tabular-nums text-[#F9FAFB]">{plan.priceDisplay}</span>
        <span className="text-[#9CA3AF]"> {plan.priceNote}</span>
      </p>
      {isGrowth ? (
        <span className="mx-auto mt-2.5 inline-flex text-[0.65rem] font-semibold uppercase tracking-wider text-[#FBBF24]">
          {recommendedLabel}
        </span>
      ) : null}
    </div>
  );
}

function MobileFeatureRow({
  row,
  selectedPlanId,
}: {
  row: ComparisonRow;
  selectedPlanId: string;
}) {
  const rawValue = row.values[selectedPlanId as keyof typeof row.values] ?? false;

  return (
    <article className="rounded-xl border border-[#374151]/55 bg-[#1F2937]/45 px-4 py-3.5">
      <h3 className="text-sm font-semibold leading-snug text-[#F9FAFB]">{row.label}</h3>
      <div className="mt-2.5 rounded-lg border border-white/8 bg-[#111827]/55 px-3 py-2.5">
        <MobileValue
          format={row.format as "boolean" | "text"}
          value={rawValue as boolean | string}
        />
      </div>
    </article>
  );
}

export function PricingComparison({ comparison, plans }: PricingComparisonProps) {
  const planOrder = comparison.planColumnIds;
  const plansById = useMemo(() => new Map(plans.map((p) => [p.id, p])), [plans]);
  const orderedPlans = planOrder
    .map((id) => plansById.get(id))
    .filter((p): p is Plan => p != null);

  const initialPlanId = planOrder.includes("growth") ? "growth" : (planOrder[0] ?? "");
  const [selectedPlanId, setSelectedPlanId] = useState(initialPlanId);

  const selectedPlan = useMemo(
    () => plansById.get(selectedPlanId) ?? orderedPlans[0] ?? null,
    [orderedPlans, plansById, selectedPlanId],
  );

  const selectedPlanLabel = useMemo(() => {
    const idx = planOrder.indexOf(selectedPlanId);
    return idx >= 0 ? comparison.planColumnLabels[idx] ?? selectedPlanId : selectedPlanId;
  }, [comparison.planColumnLabels, planOrder, selectedPlanId]);

  const featureLabel =
    "featureColumnLabel" in comparison && comparison.featureColumnLabel
      ? comparison.featureColumnLabel
      : "Capability";

  const noteRow: ComparisonRow | null =
    "smartFormsNote" in comparison &&
    comparison.smartFormsNote &&
    typeof comparison.smartFormsNote === "object" &&
    "label" in comparison.smartFormsNote
      ? (comparison.smartFormsNote as ComparisonRow)
      : null;

  const essentialRows = comparison.rows.filter(
    (r) =>
      ![
        "Unlimited Smart Forms",
        "Advanced Financial Reports",
        "Monthly & yearly summaries",
        "Category breakdowns & trends",
        "Advanced Export",
        "Filter & select what you export",
        "Structured Excel or PDF export",
        "Advanced financial organization",
        "Priority support",
      ].includes(r.label) && !["Advanced reports & structured export"].includes(r.label),
  );

  const scaleRows = comparison.rows.filter((r) =>
    [
      "Unlimited Smart Forms",
      "Advanced Financial Reports",
      "Monthly & yearly summaries",
      "Category breakdowns & trends",
      "Advanced Export",
      "Filter & select what you export",
      "Structured Excel or PDF export",
      "Advanced financial organization",
      "Priority support",
    ].includes(r.label),
  );

  const renderRow = (row: ComparisonRow) => (
    <Fragment key={row.label}>
      <tr className="align-middle">
        <th
          scope="row"
          className={cn(
            "border-b border-[#374151]/45 py-[1.125rem] pr-4 pl-0 text-left align-middle text-sm font-normal leading-snug text-[#9CA3AF]",
            stickyFeatureBg,
            "sticky left-0 z-10",
          )}
        >
          {row.label}
        </th>
        {planOrder.map((planId) => {
          const rawValue = row.values[planId as keyof typeof row.values] ?? false;
          return (
            <PlanCell
              key={planId}
              format={row.format as "boolean" | "text"}
              value={rawValue as boolean | string}
            />
          );
        })}
      </tr>
    </Fragment>
  );

  return (
    <section id={comparison.id} className="min-w-0 max-w-full border-b border-white/6 py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-5 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-[#F9FAFB] sm:text-3xl md:text-4xl">
          {comparison.title}
        </h2>
        <p className="mt-3 text-pretty text-base leading-relaxed text-[#9CA3AF] sm:text-lg">{comparison.subtitle}</p>
      </div>

      <div className="mt-10 w-full min-w-0 max-w-full px-3 sm:px-4 md:px-6 lg:px-10">
        <div className="space-y-4 lg:hidden">
          <div className="rounded-xl border border-white/10 bg-[#111827]/55 p-2">
            <div className="grid grid-cols-3 gap-1">
              {planOrder.map((planId, idx) => {
                const label = comparison.planColumnLabels[idx] ?? planId;
                const active = planId === selectedPlanId;
                return (
                  <button
                    key={planId}
                    type="button"
                    onClick={() => setSelectedPlanId(planId)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-lg px-2 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                      active
                        ? "bg-[#374151] text-[#F9FAFB]"
                        : "bg-transparent text-[#9CA3AF] hover:bg-white/5 hover:text-[#E5E7EB]",
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedPlan ? (
            <PlanHeaderCard
              plan={selectedPlan}
              isGrowth={selectedPlan.id === "growth"}
              recommendedLabel={comparison.recommendedLabel}
            />
          ) : null}

          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
            {featureLabel}: <span className="text-[#9CA3AF]">{selectedPlanLabel}</span>
          </p>

          {essentialRows.map((row) => (
            <MobileFeatureRow key={row.label} row={row} selectedPlanId={selectedPlanId} />
          ))}

          {scaleRows.length > 0 ? (
            <div className="pt-2">
              <h3 className="text-sm font-semibold tracking-tight text-[#F9FAFB]">Scale only</h3>
              <div className="mt-3 space-y-4">
                {scaleRows.map((row) => (
                  <MobileFeatureRow key={row.label} row={row} selectedPlanId={selectedPlanId} />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div
          className="hidden w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain scroll-smooth [-webkit-overflow-scrolling:touch] touch-pan-x lg:block"
          role="region"
          aria-label={comparison.title}
          tabIndex={0}
        >
          <div className={cn("inline-block min-w-full align-top space-y-8", comparisonMinInner)}>
            <div className={cn(comparisonGridCols, "items-stretch gap-4")}>
              <div className={cn("min-h-33 shrink-0", stickyFeatureBg, "sticky left-0 z-20")} aria-hidden />
              {orderedPlans.map((plan, idx) => {
                const isGrowth = planOrder[idx] === "growth";
                return (
                  <PlanHeaderCard
                    key={plan.id}
                    plan={plan}
                    isGrowth={isGrowth}
                    recommendedLabel={comparison.recommendedLabel}
                  />
                );
              })}
            </div>

            <div className="[&_tbody>tr:last-child>td]:border-b-0 [&_tbody>tr:last-child>th]:border-b-0">
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <caption className="sr-only">{comparison.title}</caption>
                <colgroup>
                  <col className="w-[30%]" />
                  <col />
                  <col />
                  <col />
                </colgroup>

                <thead>
                  <tr>
                    <th
                      scope="col"
                      className={cn(
                        "border-b border-[#374151]/45 py-4 pr-4 pl-0 text-left align-bottom text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]",
                        stickyFeatureBg,
                        "sticky left-0 z-10",
                      )}
                    >
                      {featureLabel}
                    </th>
                    {comparison.planColumnLabels.map((label) => (
                      <th
                        key={label}
                        scope="col"
                        className="border-b border-[#374151]/45 bg-transparent px-3 py-4 text-center align-bottom"
                      >
                        <span className="sr-only">{label}</span>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {essentialRows.map(renderRow)}

                  {scaleRows.length > 0 && (
                    <>
                      <tr className="align-middle">
                        <th
                          scope="colgroup"
                          colSpan={4}
                          className="border-b border-[#374151]/45 bg-transparent pt-10 pb-6 pr-4 pl-0 text-left align-middle text-base font-semibold tracking-tight text-[#F9FAFB]"
                        >
                          Scale only
                        </th>
                      </tr>
                      {scaleRows.map(renderRow)}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-3xl px-4 text-center sm:px-5 md:px-6">
        {noteRow && (
          <p className="text-xs leading-relaxed text-[#6B7280]">
            <span className="font-medium text-[#9CA3AF]">{noteRow.label}:</span>{" "}
            {String(noteRow.values["growth" as keyof typeof noteRow.values])}
          </p>
        )}

        {"mobileScrollHint" in comparison && typeof comparison.mobileScrollHint === "string" && (
          <p className="mt-2 text-xs text-[#4B5563] lg:hidden">{comparison.mobileScrollHint}</p>
        )}
      </div>
    </section>
  );
}
