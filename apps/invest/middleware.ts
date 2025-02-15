import { locales, defaultLocale } from "@vincero/languages-config";
import { NextResponse } from "next/server";

import { getLocaleAndSlugFromPath } from "@/utils/getLocaleAndSlugFromPath";

import type { Locale } from "@vincero/languages-config";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public files and API routes
  if (PUBLIC_FILE.test(pathname) || pathname.startsWith("/api")) {
    return;
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  const { locale: pathLocale } = getLocaleAndSlugFromPath(pathSegments);
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value as
    | Locale
    | undefined;

  // Determine target locale (cookie takes precedence if valid)
  const targetLocale =
    cookieLocale && locales.includes(cookieLocale)
      ? cookieLocale
      : defaultLocale;

  // Handle default locale (Swedish)
  if (targetLocale === defaultLocale) {
    // Remove locale prefix if present
    if (pathLocale !== defaultLocale) {
      const newPathname = "/" + pathSegments.slice(1).join("/");
      const response = NextResponse.redirect(new URL(newPathname, request.url));
      response.cookies.delete("NEXT_LOCALE");
      return response;
    }
    return NextResponse.next();
  }

  // Handle non-default locale
  if (pathLocale === defaultLocale) {
    // Add locale prefix
    const newPathname = `/${targetLocale}${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.redirect(new URL(newPathname, request.url));
    response.cookies.set("NEXT_LOCALE", targetLocale);
    return response;
  }

  // Ensure path locale matches target locale
  if (pathLocale !== targetLocale) {
    const newPathname = `/${targetLocale}/${pathSegments.slice(1).join("/")}`;
    const response = NextResponse.redirect(new URL(newPathname, request.url));
    response.cookies.set("NEXT_LOCALE", targetLocale);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
