import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "@/dictionaries/index";
import {
  PLATFORM_BRAND_COLOR,
  PLATFORM_LOGO_ICON_URL,
  PLATFORM_SITE_URL,
} from "@/app/lib/brand";
import { JsonLd } from "@/app/components/seo/json-ld";
import {
  getAlternateLocales,
  getLanguageAlternates,
  getSeoLocaleConfig,
} from "@/src/lib/seo/config";
import { getHomepageKeywordSet } from "@/src/lib/seo/pages";
import {
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "@/src/lib/seo/schema";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type Params = Promise<{ lang: string }>;

const OG_IMAGE = {
  url: "/product/website-screenshot.png",
  width: 1280,
  height: 800,
} as const;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const locale = lang as Locale;
  const content = await getDictionary(locale);
  const { site } = content;

  const localeConfig = getSeoLocaleConfig(locale);
  const alternates = getLanguageAlternates("");
  const alternateLocale = getAlternateLocales(locale).map(
    (value) => getSeoLocaleConfig(value).ogLocale,
  );

  return {
    metadataBase: new URL(PLATFORM_SITE_URL),
    applicationName: site.title,
    title: {
      default: site.title,
      template: `%s | ${site.title}`,
    },
    description: site.description,
    keywords: getHomepageKeywordSet(locale),
    authors: [{ name: "Ibada Cloud", url: PLATFORM_SITE_URL }],
    creator: "Ibada Cloud",
    publisher: "Ibada Cloud",
    category: "technology",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: `/${locale}`,
      languages: alternates,
    },
    openGraph: {
      type: "website",
      url: `${PLATFORM_SITE_URL}/${locale}`,
      siteName: site.title,
      title: site.title,
      description: site.description,
      locale: localeConfig.ogLocale,
      alternateLocale,
      images: [
        {
          ...OG_IMAGE,
          alt: site.description,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ibadacloud",
      creator: "@ibadacloud",
      title: site.title,
      description: site.description,
      images: [
        {
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: site.description,
        },
      ],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", type: "image/x-icon" },
        { url: "/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/brand/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: PLATFORM_LOGO_ICON_URL, sizes: "192x192", type: "image/png" },
      ],
      shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
      apple: [{ url: PLATFORM_LOGO_ICON_URL, sizes: "180x180", type: "image/png" }],
    },
    other: {
      "msapplication-TileColor": PLATFORM_BRAND_COLOR,
      "msapplication-TileImage": PLATFORM_LOGO_ICON_URL,
      "theme-color": PLATFORM_BRAND_COLOR,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const websiteSchema = buildWebsiteSchema(locale);
  const organizationSchema = buildOrganizationSchema(locale);

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      {children}
    </>
  );
}
