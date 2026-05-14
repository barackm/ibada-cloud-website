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
    pathname: "/solutions",
    title:
      locale === "fr"
        ? "Solutions de gestion d'église"
        : "Church Management Solutions",
    description:
      locale === "fr"
        ? "Explorez les solutions Ibada Cloud pour CRM église, gestion des membres, finances et formulaires intelligents."
        : "Explore Ibada Cloud solutions for church CRM, membership management, finance, and Smart Forms.",
    keywords: getRouteHubKeywords(locale, "solutions"),
  });
}

export default async function SolutionsHubPage({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const pages = getPagesByRoute(locale, "solutions");

  const breadcrumb = buildBreadcrumbSchema({
    locale,
    items: [
      { name: locale === "fr" ? "Accueil" : "Home", path: "" },
      { name: locale === "fr" ? "Solutions" : "Solutions", path: "/solutions" },
    ],
  });

  return (
    <>
      <JsonLd data={breadcrumb} />
      <SeoShell locale={locale}>
        <SeoHubView
          locale={locale}
          title={locale === "fr" ? "Solutions" : "Solutions"}
          description={
            locale === "fr"
              ? "Choisissez la solution adaptée à votre contexte: CRM, membres, finances et formulaires intelligents."
              : "Choose the right solution for your church context: CRM, members, finance, and Smart Forms."
          }
          pages={pages}
        />
      </SeoShell>
    </>
  );
}
