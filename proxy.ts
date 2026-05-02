import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, hasLocale } from "./dictionaries/index";

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get("accept-language") ?? "";
  for (const entry of acceptLang.split(",")) {
    const lang = entry.split(";")[0]?.trim().split("-")[0]?.toLowerCase();
    if (lang && hasLocale(lang)) return lang;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path already starts with a supported locale
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale and set it as a header for the root layout to read
    const lang = pathname.split("/")[1] ?? defaultLocale;
    const response = NextResponse.next({
      request: {
        headers: new Headers({ ...Object.fromEntries(request.headers), "x-lang": lang }),
      },
    });
    return response;
  }

  // Redirect to locale-prefixed path
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip Next.js internals, API routes, and files with extensions (images, fonts, etc.)
    "/((?!_next|api|favicon\\.ico|apple-icon|icon|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
