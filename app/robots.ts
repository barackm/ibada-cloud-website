import type { MetadataRoute } from "next";
import { PLATFORM_SITE_URL } from "@/app/lib/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${PLATFORM_SITE_URL}/sitemap.xml`,
    host: PLATFORM_SITE_URL,
  };
}
