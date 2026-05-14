import type { MetadataRoute } from "next";
import { locales } from "@/dictionaries/index";
import { PLATFORM_SITE_URL } from "@/app/lib/brand";
import { getAllSeoPages, getSeoPagePath } from "@/src/lib/seo/pages";

const HUB_PATHS = ["/solutions", "/compare", "/guides"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const homeUrl = `${PLATFORM_SITE_URL}/${locale}`;
    entries.push({
      url: homeUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((value) => [
            value,
            `${PLATFORM_SITE_URL}/${value}`,
          ]),
        ),
      },
    });

    for (const hubPath of HUB_PATHS) {
      entries.push({
        url: `${PLATFORM_SITE_URL}/${locale}${hubPath}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((value) => [
              value,
              `${PLATFORM_SITE_URL}/${value}${hubPath}`,
            ]),
          ),
        },
      });
    }

    const pages = getAllSeoPages(locale);
    for (const page of pages) {
      const path = getSeoPagePath(page);
      entries.push({
        url: `${PLATFORM_SITE_URL}/${locale}${path}`,
        lastModified: new Date(page.updatedAt),
        changeFrequency: page.kind === "guide" ? "monthly" : "weekly",
        priority: page.kind === "guide" ? 0.7 : 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map((value) => {
              const localizedPage = getAllSeoPages(value).find(
                (candidate) =>
                  candidate.route === page.route && candidate.slug === page.slug,
              );
              const localizedPath = localizedPage
                ? getSeoPagePath(localizedPage)
                : path;
              return [value, `${PLATFORM_SITE_URL}/${value}${localizedPath}`];
            }),
          ),
        },
      });
    }
  }

  return entries;
}
