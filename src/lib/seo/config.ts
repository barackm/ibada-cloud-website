import type { Locale } from "@/dictionaries/index";
import { defaultLocale, locales } from "@/dictionaries/index";
import type { SeoLocaleConfig, SeoPageIntent } from "@/src/lib/seo/types";

const EN_TRANSACTIONAL = [
  "church management software",
  "church management system",
  "church management platform",
  "church CRM",
  "church CRM software",
  "church membership management software",
  "church member management",
  "church database software",
  "church administration software",
  "parish management software",
  "church finance software",
  "church donation tracking software",
  "church giving software",
  "church attendance tracking software",
  "church event management software",
  "church volunteer scheduling software",
  "church form builder",
  "church onboarding forms",
  "church reporting software",
  "multi-site church software",
  "cloud church software",
];

const EN_COMPARISON = [
  "best church management software",
  "church management software for small churches",
  "church software pricing",
  "church CRM vs church management software",
  "churchtrac alternative",
  "breeze chms alternative",
  "planning center alternative",
  "church management platform comparison",
];

const EN_INFORMATIONAL = [
  "how to choose church management software",
  "church CRM implementation checklist",
  "church member data management best practices",
  "church donation reporting template",
  "how to digitize church administration",
  "church finance controls checklist",
  "church forms workflow guide",
  "church membership onboarding process",
];

const FR_TRANSACTIONAL = [
  "logiciel de gestion d'église",
  "logiciel gestion eglise",
  "logiciel de gestion paroissiale",
  "plateforme de gestion d'église",
  "logiciel CRM église",
  "CRM église",
  "gestion des membres église",
  "logiciel administration église",
  "logiciel pour église",
  "solution église en ligne",
  "logiciel finances église",
  "logiciel dons et offrandes",
  "gestion dîmes et offrandes",
  "suivi des membres église",
  "logiciel formulaires église",
  "gestion événements église",
  "planification bénévoles église",
  "rapport financier église",
  "logiciel église multisite",
  "application gestion église",
];

const FR_COMPARISON = [
  "meilleur logiciel de gestion d'église",
  "comparatif logiciel église",
  "prix logiciel de gestion d'église",
  "alternative church manager",
  "alternative CRM église",
  "CRM église vs logiciel de gestion d'église",
  "comparaison plateforme église",
];

const FR_INFORMATIONAL = [
  "comment choisir un logiciel de gestion d'église",
  "digitaliser son église",
  "organisation administrative d'une église",
  "suivi pastoral numérique",
  "base de données membres église",
  "checklist implémentation CRM église",
  "guide formulaires intelligents église",
  "contrôles financiers église",
];

const keywordClusters = (
  transactional: string[],
  comparison: string[],
  informational: string[],
): Record<SeoPageIntent, string[]> => ({
  transactional,
  comparison,
  informational,
});

export const SEO_LOCALE_CONFIG: Record<Locale, SeoLocaleConfig> = {
  en: {
    locale: "en",
    languageTag: "en-US",
    ogLocale: "en_US",
    languageName: "English",
    siteName: "Ibada Cloud",
    siteAlternateName: "Ibada Cloud Church Management Platform",
    organizationName: "Ibada Cloud",
    organizationDescription:
      "Ibada Cloud helps churches manage members, branches, activities, finances, forms, and operations in one platform.",
    supportEmail: "hello@ibadacloud.com",
    sameAs: [],
    keywordClusters: keywordClusters(
      EN_TRANSACTIONAL,
      EN_COMPARISON,
      EN_INFORMATIONAL,
    ),
  },
  fr: {
    locale: "fr",
    languageTag: "fr-FR",
    ogLocale: "fr_FR",
    languageName: "Français",
    siteName: "Ibada Cloud",
    siteAlternateName: "Ibada Cloud Plateforme de gestion d'église",
    organizationName: "Ibada Cloud",
    organizationDescription:
      "Ibada Cloud aide les églises à gérer membres, branches, activités, finances, formulaires et opérations quotidiennes.",
    supportEmail: "hello@ibadacloud.com",
    sameAs: [],
    keywordClusters: keywordClusters(
      FR_TRANSACTIONAL,
      FR_COMPARISON,
      FR_INFORMATIONAL,
    ),
  },
};

export function getSeoLocaleConfig(locale: Locale): SeoLocaleConfig {
  return SEO_LOCALE_CONFIG[locale];
}

export function getAlternateLocales(locale: Locale): Locale[] {
  return locales.filter((value) => value !== locale);
}

export function getLanguageAlternates(pathname: string): Record<string, string> {
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const suffix = cleanPath === "/" ? "" : cleanPath;
  const entries = locales.map((locale) => {
    const config = SEO_LOCALE_CONFIG[locale];
    return [config.languageTag, `/${locale}${suffix}`] as const;
  });

  return Object.fromEntries([
    ["x-default", `/${defaultLocale}${suffix}`],
    ...entries,
  ]);
}

export function collectClusterKeywords(locale: Locale): string[] {
  const config = getSeoLocaleConfig(locale);
  const values = Object.values(config.keywordClusters).flat();
  return Array.from(new Set(values));
}
