import type { Locale } from "@/dictionaries/index";
import { PLATFORM_LOGO_ICON_URL, PLATFORM_SITE_URL } from "@/app/lib/brand";
import { getSeoLocaleConfig } from "@/src/lib/seo/config";
import type { SeoPage } from "@/src/lib/seo/types";

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function buildWebsiteSchema(locale: Locale): Record<string, unknown> {
  const config = getSeoLocaleConfig(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${PLATFORM_SITE_URL}/#website-${locale}`,
    url: `${PLATFORM_SITE_URL}/${locale}`,
    name: config.siteName,
    alternateName: config.siteAlternateName,
    inLanguage: config.languageTag,
    publisher: {
      "@id": `${PLATFORM_SITE_URL}/#organization`,
    },
  };
}

export function buildOrganizationSchema(locale: Locale): Record<string, unknown> {
  const config = getSeoLocaleConfig(locale);
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${PLATFORM_SITE_URL}/#organization`,
    name: config.organizationName,
    url: PLATFORM_SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: PLATFORM_LOGO_ICON_URL,
    },
    description: config.organizationDescription,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: config.supportEmail,
        availableLanguage: ["English", "French"],
      },
    ],
  };

  if (config.sameAs.length > 0) {
    out.sameAs = config.sameAs;
  }

  return out;
}

export function buildBreadcrumbSchema({
  locale,
  items,
}: {
  locale: Locale;
  items: Array<{ name: string; path: string }>;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${PLATFORM_SITE_URL}/${locale}${item.path}`,
    })),
  };
}

export function buildSoftwareApplicationSchema(page: SeoPage): Record<string, unknown> | null {
  if (!page.softwareApplication) return null;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.title,
    applicationCategory: page.softwareApplication.applicationCategory,
    operatingSystem: page.softwareApplication.operatingSystem,
    description: page.description,
    url: `${PLATFORM_SITE_URL}/${page.locale}${page.route === "platform" ? "/platform" : `/${page.route}/${page.slug}`}`,
    offers: {
      "@type": "Offer",
      category: page.softwareApplication.pricingSummary,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${PLATFORM_SITE_URL}/${page.locale}${page.route === "platform" ? "/platform" : `/${page.route}/${page.slug}`}`,
    },
    featureList: page.softwareApplication.featureList,
    provider: {
      "@id": `${PLATFORM_SITE_URL}/#organization`,
    },
  };
}
