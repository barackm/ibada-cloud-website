import type { Metadata } from "next";
import type { Locale } from "@/dictionaries/index";
import { PLATFORM_SITE_URL } from "@/app/lib/brand";
import {
  getAlternateLocales,
  getLanguageAlternates,
  getSeoLocaleConfig,
} from "@/src/lib/seo/config";

const OG_IMAGE = {
  url: "/product/website-screenshot.png",
  width: 1280,
  height: 800,
} as const;

export function absoluteUrl(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${PLATFORM_SITE_URL}${normalized}`;
}

export function buildLocalizedMetadata({
  locale,
  pathname,
  title,
  description,
  keywords,
  type = "website",
}: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  keywords: string[];
  type?: "website" | "article";
}): Metadata {
  const config = getSeoLocaleConfig(locale);
  const alternates = getLanguageAlternates(pathname);
  const alternateLocale = getAlternateLocales(locale).map(
    (value) => getSeoLocaleConfig(value).ogLocale,
  );

  return {
    metadataBase: new URL(PLATFORM_SITE_URL),
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${locale}${pathname}`,
      languages: alternates,
    },
    openGraph: {
      type,
      locale: config.ogLocale,
      alternateLocale,
      url: absoluteUrl(`/${locale}${pathname}`),
      title,
      description,
      siteName: config.siteName,
      images: [
        {
          ...OG_IMAGE,
          alt: description,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
