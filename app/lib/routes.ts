import { locales, type Locale } from "@/dictionaries/index";

const ABSOLUTE_OR_SPECIAL = /^(?:https?:|mailto:|tel:|\/\/)/i;

/** Locale-agnostic paths in content become `/${lang}/…`; mailto and absolute URLs pass through. */
export function withLang(href: string, lang: Locale): string {
  if (ABSOLUTE_OR_SPECIAL.test(href)) return href;
  if (!href.startsWith("/")) return href;

  const pathOnly = href.split(/[?#]/)[0];
  const firstSegment = pathOnly.split("/").filter(Boolean)[0];
  if (firstSegment && (locales as readonly string[]).includes(firstSegment)) {
    return href;
  }

  const hashIndex = href.indexOf("#");
  const pathAndQuery = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex);

  if (pathAndQuery === "/" || pathAndQuery === "") {
    return `/${lang}${hash}`;
  }

  return `/${lang}${pathAndQuery}${hash}`;
}
