import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/app/components/seo/json-ld";
import { SeoPageView } from "@/app/components/seo/seo-page";
import { SeoShell } from "@/app/components/seo/seo-shell";
import { hasLocale, type Locale } from "@/dictionaries/index";
import { buildLocalizedMetadata } from "@/src/lib/seo/metadata";
import { getSeoPageByRouteAndSlug } from "@/src/lib/seo/pages";
import {
  buildBreadcrumbSchema,
  buildSoftwareApplicationSchema,
} from "@/src/lib/seo/schema";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const locale = lang as Locale;
  const page = getSeoPageByRouteAndSlug(locale, "platform", "platform");
  if (!page) return {};

  return buildLocalizedMetadata({
    locale,
    pathname: "/platform",
    title: page.metaTitle,
    description: page.description,
    keywords: page.keywords,
  });
}

export default async function PlatformPage({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const page = getSeoPageByRouteAndSlug(locale, "platform", "platform");
  if (!page) notFound();

  const breadcrumb = buildBreadcrumbSchema({
    locale,
    items: [
      { name: locale === "fr" ? "Accueil" : "Home", path: "" },
      { name: page.breadcrumbLabel, path: "/platform" },
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
