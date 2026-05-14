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
    pathname: "/guides",
    title:
      locale === "fr"
        ? "Guides logiciels de gestion d'église"
        : "Church Management Software Guides",
    description:
      locale === "fr"
        ? "Guides pratiques pour choisir, déployer et optimiser votre logiciel de gestion d'église."
        : "Practical guides to evaluate, deploy, and optimize church management software.",
    keywords: getRouteHubKeywords(locale, "guides"),
    type: "article",
  });
}

export default async function GuidesHubPage({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const pages = getPagesByRoute(locale, "guides");

  const breadcrumb = buildBreadcrumbSchema({
    locale,
    items: [
      { name: locale === "fr" ? "Accueil" : "Home", path: "" },
      { name: locale === "fr" ? "Guides" : "Guides", path: "/guides" },
    ],
  });

  return (
    <>
      <JsonLd data={breadcrumb} />
      <SeoShell locale={locale}>
        <SeoHubView
          locale={locale}
          title={locale === "fr" ? "Guides" : "Guides"}
          description={
            locale === "fr"
              ? "Retrouvez nos guides pratiques pour structurer membres, finances, formulaires et opérations d'église."
              : "Explore practical guides to structure membership, finance, forms, and church operations."
          }
          pages={pages}
        />
      </SeoShell>
    </>
  );
}
