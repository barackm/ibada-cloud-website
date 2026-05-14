import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/app/components/seo/json-ld";
import { SeoHubView } from "@/app/components/seo/seo-hub";
import { SeoShell } from "@/app/components/seo/seo-shell";
import { hasLocale, type Locale } from "@/dictionaries/index";
import { buildLocalizedMetadata } from "@/src/lib/seo/metadata";
import { getPagesByRoute, getRouteHubKeywords } from "@/src/lib/seo/pages";
import { buildBreadcrumbSchema } from "@/src/lib/seo/schema";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const locale = lang as Locale;

  return buildLocalizedMetadata({
    locale,
    pathname: "/compare",
    title:
      locale === "fr"
        ? "Comparatifs logiciels de gestion d'église"
        : "Church Management Software Comparisons",
    description:
      locale === "fr"
        ? "Comparez les formules et capacités d'Ibada Cloud pour choisir la meilleure option pour votre église."
        : "Compare Ibada Cloud plans and capabilities to choose the best church software fit for your team.",
    keywords: getRouteHubKeywords(locale, "compare"),
  });
}

export default async function CompareHubPage({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const pages = getPagesByRoute(locale, "compare");

  const breadcrumb = buildBreadcrumbSchema({
    locale,
    items: [
      { name: locale === "fr" ? "Accueil" : "Home", path: "" },
      { name: locale === "fr" ? "Comparatifs" : "Compare", path: "/compare" },
    ],
  });

  return (
    <>
      <JsonLd data={breadcrumb} />
      <SeoShell locale={locale}>
        <SeoHubView
          locale={locale}
          title={locale === "fr" ? "Comparatifs" : "Compare"}
          description={
            locale === "fr"
              ? "Comparez rapidement les limites, fonctionnalités et niveaux de support selon votre stade de croissance."
              : "Compare limits, capabilities, and support levels based on your current growth stage."
          }
          pages={pages}
        />
      </SeoShell>
    </>
  );
}
