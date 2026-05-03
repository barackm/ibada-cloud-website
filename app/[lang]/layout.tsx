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

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type Params = Promise<{ lang: string }>;

// Maps our locale codes to BCP-47 / OpenGraph locale strings
const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
};

// Locale-specific keywords
const KEYWORDS: Record<Locale, string[]> = {
  en: [
    "Ibada Cloud",
    "church management software",
    "church CRM",
    "church operations",
    "church forms",
    "church finance",
    "membership management",
    "parish management",
    "Smart Forms",
    "church platform",
  ],
  fr: [
    "Ibada Cloud",
    "logiciel de gestion d'église",
    "CRM église",
    "opérations d'église",
    "formulaires d'église",
    "finances d'église",
    "gestion des membres",
    "gestion paroissiale",
    "formulaires intelligents",
    "plateforme d'église",
  ],
};

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
  const ogLocale = OG_LOCALE[locale];
  const alternateLocales = locales.filter((l) => l !== locale);

  return {
    metadataBase: new URL(PLATFORM_SITE_URL),
    applicationName: site.title,
    title: {
      default: site.title,
      template: `%s | ${site.title}`,
    },
    description: site.description,
    keywords: KEYWORDS[locale],
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
      canonical: `/${lang}`,
      languages: Object.fromEntries([
        [ogLocale, `/${lang}`],
        ...alternateLocales.map((l) => [OG_LOCALE[l], `/${l}`]),
      ]),
    },
    openGraph: {
      type: "website",
      url: `${PLATFORM_SITE_URL}/${lang}`,
      siteName: site.title,
      title: site.title,
      description: site.description,
      locale: ogLocale,
      alternateLocale: alternateLocales.map((l) => OG_LOCALE[l]),
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
      apple: [
        { url: PLATFORM_LOGO_ICON_URL, sizes: "180x180", type: "image/png" },
      ],
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
  return <>{children}</>;
}
