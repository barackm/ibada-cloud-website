import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/app/components/seo/json-ld";
import { SeoPageView } from "@/app/components/seo/seo-page";
import { SeoShell } from "@/app/components/seo/seo-shell";
import { hasLocale, locales, type Locale } from "@/dictionaries/index";
import { buildLocalizedMetadata } from "@/src/lib/seo/metadata";
import {
  getPagesByRoute,
  getSeoPageByRouteAndSlug,
} from "@/src/lib/seo/pages";
import {
  buildBreadcrumbSchema,
  buildSoftwareApplicationSchema,
} from "@/src/lib/seo/schema";

type Params = Promise<{ lang: string; slug: string }>;

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPagesByRoute(locale, "solutions").map((page) => ({
      lang: locale,
      slug: page.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};

  const locale = lang as Locale;
  const page = getSeoPageByRouteAndSlug(locale, "solutions", slug);
  if (!page) return {};

  return buildLocalizedMetadata({
    locale,
    pathname: `/solutions/${page.slug}`,
    title: page.metaTitle,
    description: page.description,
    keywords: page.keywords,
  });
}

export default async function SolutionPage({
  params,
}: {
  params: Params;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const page = getSeoPageByRouteAndSlug(locale, "solutions", slug);
  if (!page) notFound();

  const breadcrumb = buildBreadcrumbSchema({
    locale,
    items: [
      { name: locale === "fr" ? "Accueil" : "Home", path: "" },
      { name: locale === "fr" ? "Solutions" : "Solutions", path: "/solutions" },
      { name: page.breadcrumbLabel, path: `/solutions/${page.slug}` },
    ],
  });
  const softwareSchema = buildSoftwareApplicationSchema(page);

  return (
    <>
      <JsonLd data={breadcrumb} />
      {softwareSchema ? <JsonLd data={softwareSchema} /> : null}
      <SeoShell locale={locale}>
        <SeoPageView locale={locale} page={page} />
      </SeoShell>
    </>
  );
}
