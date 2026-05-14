import type { Locale } from "@/dictionaries/index";

export type SeoPageIntent = "transactional" | "comparison" | "informational";
export type SeoPageKind = "money" | "guide";
export type SeoPageRoute = "platform" | "solutions" | "compare" | "guides";

export type SeoPageLink = {
  label: string;
  href: string;
};

export type SeoPageSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type SeoSoftwareApplication = {
  applicationCategory: string;
  operatingSystem: string;
  pricingSummary: string;
  featureList: string[];
};

export type SeoPage = {
  locale: Locale;
  kind: SeoPageKind;
  intent: SeoPageIntent;
  route: SeoPageRoute;
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  heroEyebrow: string;
  sections: SeoPageSection[];
  relatedLinks: SeoPageLink[];
  cta: SeoPageLink;
  keywords: string[];
  breadcrumbLabel: string;
  updatedAt: string;
  softwareApplication?: SeoSoftwareApplication;
};

export type SeoLocaleConfig = {
  locale: Locale;
  languageTag: string;
  ogLocale: string;
  languageName: string;
  siteName: string;
  siteAlternateName: string;
  organizationName: string;
  organizationDescription: string;
  supportEmail: string;
  sameAs: string[];
  keywordClusters: Record<SeoPageIntent, string[]>;
};
